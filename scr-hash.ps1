Add-Type -AssemblyName System.Drawing
$root = "C:/Users/Narwal/Downloads/Story App 1 (1)"
$folders = @(6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,39,40,41,42,43,44,45,46,47,48,49,50,52,55,56,57,58,59,60,61)
foreach ($f in $folders) {
  $dir = Join-Path $root "$f"
  foreach ($file in Get-ChildItem $dir -File | Where-Object { $_.Extension -match '^\.(jpe?g|png)$' }) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $bmp = New-Object System.Drawing.Bitmap 16,16
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, 16, 16)
    $vals = @()
    for ($y=0; $y -lt 16; $y++) { for ($x=0; $x -lt 16; $x++) { $c = $bmp.GetPixel($x,$y); $vals += [int](0.299*$c.R + 0.587*$c.G + 0.114*$c.B) } }
    $avg = ($vals | Measure-Object -Average).Average
    $bits = ''
    foreach ($v in $vals) { if ($v -ge $avg) { $bits += '1' } else { $bits += '0' } }
    $hex = ''
    for ($i=0; $i -lt 256; $i+=4) { $nib = [Convert]::ToInt32($bits.Substring($i,4),2); $hex += $nib.ToString('x') }
    Out-File -FilePath "staging/hashes.tsv" -Encoding utf8 -Append -InputObject "$f`t$($file.Name)`t$hex"
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  }
}
