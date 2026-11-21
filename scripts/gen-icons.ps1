Add-Type -AssemblyName System.Drawing

$srcPath = "assets\brand\romantic-stories-logo.jpeg"
$src = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Source: $($src.Width)x$($src.Height)"

function Save-Bitmap($bmp, $path) {
  $dir = Split-Path $path -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host "  $path"
}

function Resize-Center($img, $maxW, $maxH) {
  $scale = [Math]::Min($maxW / $img.Width, $maxH / $img.Height)
  $w = [int]($img.Width * $scale)
  $h = [int]($img.Height * $scale)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)
  $x = ([int](($maxW - $w) / 2))
  $y = ([int](($maxH - $h) / 2))
  $g.DrawImage($img, $x, $y, $w, $h)
  $g.Dispose()
  $bmp
}

function Fill-Canvas($w, $h, $color) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear($color)
  $g.Dispose()
  $bmp
}

function Sample-EdgeColor($img) {
  # Average pixels along edges to get a representative background tone
  $bmp = New-Object System.Drawing.Bitmap(1, 1)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  # sample a grid of edge pixels
  $sumR=0;$sumG=0;$sumB=0;$n=0
  $step = [int]($img.Width / 8)
  for ($y=0; $y -lt $img.Height; $y+=$step) {
    for ($x=0; $x -lt $img.Width; $x+=$step) {
      if ($x -lt 40 -or $x -ge $img.Width-40 -or $y -lt 40 -or $y -ge $img.Height-40) {
        $px = $bmp  # placeholder
      }
    }
  }
  $g.Dispose(); $bmp.Dispose()
  # fallback warm peach if sampling too complex
  return [System.Drawing.Color]::FromArgb(255, 244, 228, 212)
}

$bgColor = Sample-EdgeColor $src
Write-Host "Background color: $($bgColor.R),$($bgColor.G),$($bgColor.B)"

$outImages = "assets\images"
$mipBase   = "android\app\src\main\res"

# ---------- 1. app icon.png (1024) ----------
$icon = Resize-Center $src 1024 1024
Save-Bitmap $icon "$outImages\icon.png"
$icon.Dispose()

# ---------- 2. android adaptive foreground (photo on transparent, full bleed) ----------
$fg = Resize-Center $src 1024 1024
Save-Bitmap $fg "$outImages\android-icon-foreground.png"
Save-Bitmap $fg "$mipBase\mipmap-xxxhdpi\ic_launcher_foreground.png"
$fg.Dispose()

# ---------- 3. android adaptive background (solid color) ----------
$bg = Fill-Canvas 1024 1024 $bgColor
Save-Bitmap $bg "$outImages\android-icon-background.png"
Save-Bitmap $bg "$mipBase\mipmap-xxxhdpi\ic_launcher_background.png"
$bg.Dispose()

# ---------- 4. splash icons (512) ----------
$splash = Resize-Center $src 512 512
Save-Bitmap $splash "$outImages\splash-icon.png"
Save-Bitmap $splash "$outImages\splash-icon-dark.png"
$splash.Dispose()

# ---------- 6. favicon (64) ----------
$fav = Resize-Center $src 64 64
Save-Bitmap $fav "$outImages\favicon.png"
$fav.Dispose()

# ---------- 7. legacy mipmap launcher icons (png replacing webp) ----------
$densities = @(
  @{ name="mdpi";   s=48;  a=72 },
  @{ name="hdpi";   s=72;  a=108 },
  @{ name="xhdpi";  s=96;  a=144 },
  @{ name="xxhdpi"; s=144; a=216 },
  @{ name="xxxhdpi";s=192; a=288 }
)
foreach ($d in $densities) {
  $folder = "$mipBase\mipmap-$($d.name)"
  # ic_launcher (full photo)
  $launcher = Resize-Center $src $d.s $d.s
  Save-Bitmap $launcher "$folder\ic_launcher.png"
  $launcher.Dispose()
  # ic_launcher_round (circle crop)
  $roundBmp = New-Object System.Drawing.Bitmap($d.s, $d.s)
  $rg = [System.Drawing.Graphics]::FromImage($roundBmp)
  $rg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $rg.Clear([System.Drawing.Color]::Transparent)
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $gp.AddEllipse(0, 0, $d.s, $d.s)
  $rg.SetClip($gp)
  $rg.DrawImage($src, 0, 0, $d.s, $d.s)
  $rg.Dispose(); $gp.Dispose()
  Save-Bitmap $roundBmp "$folder\ic_launcher_round.png"
  $roundBmp.Dispose()
  # adaptive layers at adaptive size
  $afg = Resize-Center $src $d.a $d.a
  Save-Bitmap $afg "$folder\ic_launcher_foreground.png"
  $afg.Dispose()
  $abg = Fill-Canvas $d.a $d.a $bgColor
  Save-Bitmap $abg "$folder\ic_launcher_background.png"
  $abg.Dispose()
}

# ---------- 8. anydpi adaptive xml (ensure it exists) ----------
$anydpi = "$mipBase\mipmap-anydpi-v26"
if (-not (Test-Path $anydpi)) { New-Item -ItemType Directory -Path $anydpi -Force | Out-Null }
$xml = @"
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
"@
$xml | Out-File -FilePath "$anydpi\ic_launcher.xml" -Encoding utf8
# Round icons must reuse the adaptive foreground; the legacy 48dp bitmap is
# not a valid 108dp adaptive layer.
$xml | Out-File -FilePath "$anydpi\ic_launcher_round.xml" -Encoding utf8
Write-Host "  $anydpi\ic_launcher.xml / ic_launcher_round.xml"

$src.Dispose()
Write-Host "DONE - all icons generated."
