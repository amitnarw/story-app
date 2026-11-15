import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'assets', 'stories');

function collectSvgFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectSvgFiles(full, out);
    else if (entry.name.endsWith('.svg')) out.push(full);
  }
  return out;
}

function parseNaturalSize(svgText) {
  const widthMatch = svgText.match(/width="?(\d+)px?"?/);
  const heightMatch = svgText.match(/height="?(\d+)px?"?/);
  const viewBoxMatch = svgText.match(/viewBox="?([\d\s.,]+)"?/);

  let width = widthMatch ? Number(widthMatch[1]) : null;
  let height = heightMatch ? Number(heightMatch[1]) : null;

  if ((!width || !height) && viewBoxMatch) {
    const [_x, _y, vbWidth, vbHeight] = viewBoxMatch[1]
      .split(/[\s,]+/)
      .map(Number);
    width = width ?? vbWidth;
    height = height ?? vbHeight;
  }

  // Cap long edge at 1200px so covers aren't larger than a phone screen needs.
  const cap = 1200;
  const longEdge = Math.max(width ?? 1024, height ?? 1024);
  const scale = longEdge > cap ? cap / longEdge : 1;
  width = Math.round((width ?? 1024) * scale);
  height = Math.round((height ?? 1024) * scale);

  return { width, height };
}

async function renderSvgToPng(svgPath, pngPath) {
  const svgText = fs.readFileSync(svgPath, 'utf8');
  const { width, height } = parseNaturalSize(svgText);

  // resvg-js renders at the SVG's intrinsic viewBox size; inject explicit
  // width/height so output matches our target dimensions while keeping
  // viewBox intact (aspect preserved via fitToViewBox).
  const svgWithSize = svgText.replace(
    /<svg([^>]*?)>/,
    (_match, attrs) => {
      let next = attrs;
      if (!/width\s*=/.test(next)) next += ` width="${width}"`;
      if (!/height\s*=/.test(next)) next += ` height="${height}"`;
      return `<svg${next}>`;
    },
  );

  const resvg = new Resvg(Buffer.from(svgWithSize), { fitToViewBox: true });
  const buf = resvg.render().asPng();

  fs.writeFileSync(pngPath, buf);

  return { width, height };
}

(async () => {
  const svgFiles = collectSvgFiles(ASSETS_DIR);
  console.log(`Found ${svgFiles.length} SVG files`);

  let converted = 0;
  let skipped = 0;

  for (const svgPath of svgFiles) {
    const pngPath = svgPath.replace(/\.svg$/, '.png');
    const alreadyExists = fs.existsSync(pngPath);

    if (alreadyExists) {
      skipped += 1;
      continue;
    }

    try {
      const { width, height } = await renderSvgToPng(svgPath, pngPath);
      console.log(
        `PNG  ${path.relative(ROOT, pngPath)} (${width}x${height})`,
      );
      converted += 1;
    } catch (err) {
      console.error(`FAIL ${svgPath}: ${err.message}`);
    }
  }

  console.log(`Done: ${converted} converted, ${skipped} already present`);
})();
