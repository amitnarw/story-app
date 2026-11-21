# Native Android 12+ splash masks any icon it is given (the visible area is a
# 192dp circle inside a 288dp canvas), so a full logo cannot be shown there.
# The system splash is therefore background-only, and the full photo plus the
# app name are drawn by `src/components/ui/brand-splash.tsx` instead.
#
# Kept as a stable entry point: this now just makes every native splash
# drawable transparent.

& "$PSScriptRoot\gen-splash-transparent.ps1"
