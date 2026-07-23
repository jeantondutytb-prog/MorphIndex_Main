#!/usr/bin/env bash
# Lance un serveur local pour prévisualiser la landing page.
# Ouvrez ensuite http://localhost:8080 dans votre navigateur.

set -e
cd "$(dirname "$0")"
PORT="${PORT:-8080}"

echo ""
echo "  FaceIQ Labs — prévisualisation locale"
echo "  --------------------------------------"
echo "  Ouvrez dans votre navigateur :"
echo ""
echo "    http://localhost:${PORT}"
echo ""
echo "  (Appuyez sur Ctrl+C pour arrêter le serveur)"
echo ""

if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  python -m http.server "$PORT"
elif command -v npx >/dev/null 2>&1; then
  npx --yes serve . -l "$PORT"
else
  echo "Erreur : installez Python 3 ou Node.js pour lancer un serveur local."
  exit 1
fi
