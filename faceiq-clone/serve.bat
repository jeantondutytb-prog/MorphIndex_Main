@echo off
cd /d "%~dp0"
echo.
echo   MorphIndex - previsualisation locale
echo   --------------------------------------
echo   Ouvrez dans votre navigateur :
echo.
echo     http://localhost:8080
echo.
echo   (Appuyez sur Ctrl+C pour arreter le serveur)
echo.
python -m http.server 8080 2>nul || py -m http.server 8080 2>nul || (
  echo Erreur : installez Python 3 depuis https://www.python.org/
  pause
)
