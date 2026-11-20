# One-off: for every supplied story folder pick the titled 16:9 thumbnail,
# pick the three in-story images, and re-encode all four as JPEGs <= 200 KB.
Add-Type -AssemblyName System.Drawing

$root = 'C:/Users/Narwal/Downloads/Story App 1 (1)'
$out = Join-Path (Get-Location) 'staging/processed'
$limit = 200 * 1024

# Folders where more than one landscape image exists; the titled one is picked by eye.
$thumbOverride = @{
  '49' = 'BE4646BF-6CFA-42EF-BE41-798F9D858D96.PNG'
  '58' = 'BBC0CFE5-2512-4BD5-BEE8-1991DF16FE5D.PNG'
}

function Get-Dims($path) {
  $img = [System.Drawing.Image]::FromFile($path)
  $d = [pscustomobject]@{ W = $img.Width; H = $img.Height; Ratio = $img.Width / $img.Height }
  $img.Dispose()
  return $d
}

function Save-Jpeg($sourcePath, $destPath) {
  $img = [System.Drawing.Image]::FromFile($sourcePath)
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }
  $scale = 1.0
  $quality = 82
  do {
    $w = [int]($img.Width * $scale)
    $h = [int]($img.Height * $scale)
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()

    $params = New-Object System.Drawing.Imaging.EncoderParameters 1
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
      [System.Drawing.Imaging.Encoder]::Quality, [int64]$quality)
    $bmp.Save($destPath, $codec, $params)
    $bmp.Dispose()
    $size = (Get-Item $destPath).Length

    if ($size -le $limit) { break }
    if ($quality -gt 58) { $quality -= 6 } else { $scale = $scale * 0.9 }
  } while ($scale -gt 0.5)

  $img.Dispose()
  return [pscustomobject]@{ Bytes = (Get-Item $destPath).Length; Quality = $quality; Scale = $scale }
}

$rows = @()
$dirs = Get-ChildItem $root -Directory | Sort-Object { [int]$_.Name }
foreach ($dir in $dirs) {
  $folder = $dir.Name
  $files = @(Get-ChildItem $dir.FullName -File | Where-Object { $_.Extension -match '^\.(jpe?g|png)$' })
  $info = foreach ($f in $files) {
    $d = Get-Dims $f.FullName
    [pscustomobject]@{ File = $f; W = $d.W; H = $d.H; Ratio = $d.Ratio; Area = $d.W * $d.H }
  }
  $info = @($info)

  $thumb = $null
  if ($thumbOverride.ContainsKey($folder)) {
    $thumb = $info | Where-Object { $_.File.Name -eq $thumbOverride[$folder] }
  }
  if (-not $thumb) {
    $thumb = $info | Where-Object { $_.Ratio -gt 1.6 } | Sort-Object Area -Descending |
      Select-Object -First 1
  }
  if (-not $thumb) { Write-Output "$folder`tNO THUMBNAIL"; continue }

  $rest = @($info | Where-Object { $_.File.FullName -ne $thumb.File.FullName } |
    Sort-Object Area -Descending | Select-Object -First 3)

  $target = Join-Path $out $folder
  New-Item -ItemType Directory -Force -Path $target | Out-Null
  $result = Save-Jpeg $thumb.File.FullName (Join-Path $target 'card-cover.jpg')
  $total = $result.Bytes
  for ($i = 0; $i -lt $rest.Count; $i++) {
    $r = Save-Jpeg $rest[$i].File.FullName (Join-Path $target ("img-{0}.jpg" -f ($i + 1)))
    $total += $r.Bytes
  }

  $rows += [pscustomobject]@{
    Folder    = $folder
    Thumb     = $thumb.File.Name.Substring(0, 8)
    CoverKB   = [math]::Round($result.Bytes / 1KB)
    Images    = $rest.Count
    TotalKB   = [math]::Round($total / 1KB)
    ThumbSize = "$($thumb.W)x$($thumb.H)"
  }
}

$rows | Format-Table -AutoSize | Out-String -Width 200
