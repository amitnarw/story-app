export function mixHex(a: string, b: string, t: number): string {
  const hex = (c: string) => c.replace('#', '');
  const [ra, ga, ba] = hex(a).match(/../g)!.map((x) => parseInt(x, 16));
  const [rb, gb, bb] = hex(b).match(/../g)!.map((x) => parseInt(x, 16));
  const r = Math.round(ra + (rb - ra) * t);
  const g = Math.round(ga + (gb - ga) * t);
  const bb2 = Math.round(ba + (bb - ba) * t);
  return `#${[r, g, bb2]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')}`;
}

export function luminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/../g)!.map((x) => parseInt(x, 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
}
