#!/usr/bin/env bash
# run.sh — start a simple static server and open the site in your default browser
# Usage: chmod +x run.sh && ./run.sh

PORT=8000

# Try Python 3 server first
if command -v python3 >/dev/null 2>&1; then
  echo "Starting Python 3 http.server on http://localhost:${PORT}"
  # open in background (macOS and linux variants handled)
  if command -v xdg-open >/dev/null 2>&1; then
    python3 -m http.server "$PORT" &
    sleep 0.6
    xdg-open "http://localhost:${PORT}" || true
    wait
  elif command -v open >/dev/null 2>&1; then
    python3 -m http.server "$PORT" &
    sleep 0.6
    open "http://localhost:${PORT}" || true
    wait
  else
    python3 -m http.server "$PORT"
  fi
  exit 0
fi

# Fallback: npx serve (node must be installed)
if command -v npx >/dev/null 2>&1; then
  echo "Starting npx serve on http://localhost:${PORT}"
  npx serve -s . -l "$PORT"
  exit 0
fi

echo "No suitable static server found. Please run either:"
echo "  python3 -m http.server 8000"
echo "or install Node and run:"
echo "  npx serve -s . -l 8000"
exit 1
