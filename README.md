# AquaPulse — Landing Page (Demo)

This repository contains a demo landing page for "AquaPulse — Smart Water Bottle for University Students".

Files:
- index.html — main page
- styles.css — CSS
- script.js — JavaScript behaviors
- run.sh — helper to start a local static server
- README.md — instructions


## Run locally

1. Clone the repo:

   git clone https://github.com/sunvithkumarp-29-ui/aquapulse-landing
   cd aquapulse-landing

2. Quick test (no server):

   Open `index.html` in your browser (works for basic viewing).

3. Recommended (static server):

   Python 3:
     python3 -m http.server 8000
   Then open:
     http://localhost:8000

   Or with Node:
     npx serve -s . -l 8000

4. Or use the helper script:
   chmod +x run.sh
   ./run.sh
