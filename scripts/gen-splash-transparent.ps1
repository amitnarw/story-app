Add-Type -AssemblyName System.Drawing

$folders = @(
  "android\app\src\main\res\drawable-mdpi",
  "android\app\src\main\res\drawable-hdpi",
  "android\app\src\main\res\drawable-xhdpi",
  "android\app\src\main\res\drawable-xxhdpi",
  "android\app\src\main\res\drawable-xxxhdpi",
  "android\app\src\main\res\drawable-night-mdpi",
  "android\app\src\main\res\drawable-night-hdpi",
  "android\app\src\main\res\drawable-night-xhdpi",
  "android\app\src\main\res\drawable-night-xxhdpi",
  "android\app\src\main\res\drawable-night-xxxhdpi"
)

foreach ($folder in $folders) {
  if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder -Force | Out-Null }
  $bmp = New-Object System.Drawing.Bitmap(1, 1)
  $bmp.Save("$folder\splashscreen_logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "  $folder\splashscreen_logo.png (transparent 1x1)"
}

Write-Host "DONE - all splash drawables are now transparent (native splash = background only)."
