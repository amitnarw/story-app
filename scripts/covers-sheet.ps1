Add-Type -AssemblyName System.Drawing

$root = Join-Path (Get-Location) 'staging/processed'
$dirs = Get-ChildItem $root -Directory | Sort-Object { [int]$_.Name }
$cellW = 300
$cellH = 190
$cols = 5
$rows = [math]::Ceiling($dirs.Count / $cols)
$canvas = New-Object System.Drawing.Bitmap ($cellW * $cols), ($cellH * $rows)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.Clear([System.Drawing.Color]::White)
$font = New-Object System.Drawing.Font('Arial', 12, [System.Drawing.FontStyle]::Bold)

for ($i = 0; $i -lt $dirs.Count; $i++) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $dirs[$i].FullName 'card-cover.jpg'))
  $x = ($i % $cols) * $cellW
  $y = [math]::Floor($i / $cols) * $cellH
  $g.DrawImage($img, $x, $y + 22, $cellW - 6, [int](($cellW - 6) * 844 / 1500))
  $g.DrawString($dirs[$i].Name, $font, [System.Drawing.Brushes]::Black, [single]($x + 4), [single]($y + 2))
  $img.Dispose()
}

$canvas.Save((Join-Path $env:TEMP 'opencode/covers-sheet.png'))
$g.Dispose()
$canvas.Dispose()
Write-Output 'ok'
