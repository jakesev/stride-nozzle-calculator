NOZZLE CALCULATOR — HTML + PWA SOURCE

Use it
1. Open index.html to use the calculator without installing anything.
2. Enter your machine flow, units, number of equal tips and maximum PSI.
3. Choose pressure to calculate nozzle size per tip, or Check my tips to estimate pressure.
4. A code of 025 means size #2.5, not 0.25. Two #2.5 tips make #5.0 combined.

The starting setup is 15 litres/minute, 2 equal tips, maximum 4,000 PSI,
target 1,000 PSI and current tips 025. Settings are remembered only in the
current browser on the current device. Reset restores the HTML defaults.

Change the defaults in the HTML
Edit the value attributes on the inputs with IDs flow, count, maximum,
target and tip in index.html. Select the initial flow unit in flow-unit.
Use Reset in the app after editing to clear previously remembered settings.

Install as a PWA
Host all files together at an HTTPS address. Keep the files in the same
relative layout, including icons. In Android Chrome, use the browser menu:
Add to home screen, then Install if offered. On iPhone Safari, choose
Share, then Add to Home Screen. A supported browser may also show a direct
install button in the app. The first visit needs internet. Wait for
“Ready for offline use” before going offline. Installation depends on browser and device support. Clearing site data
removes offline files and saved settings.

Simply opening an HTML file uses file:// and cannot register a service worker.
For a local development test, serve this folder on localhost, for example:
  python3 -m http.server 8000
Then open http://localhost:8000/ in your browser.

Files
index.html — editable app page and machine defaults
styles.css — phone and desktop layout
calc.js — pure arithmetic and validation
app.js — form interactions, comparison chart and install handling
manifest.webmanifest — install metadata
sw.js — versioned app-shell cache
icons/ — 192px, 512px and maskable app icons

When updating files on your own host, change the version suffix in CACHE in sw.js so installed copies receive the
new app shell. Never cache authentication pages or unrelated private data.
The included service worker caches only the calculator shell.

Math
1 US gallon = 3.785411784 litres.
Combined nozzle size = US GPM × sqrt(4000 / target PSI).
Size per tip = combined nozzle size / number of equal tips.
Estimated PSI = 4000 × (US GPM / combined nozzle size)^2.
The 4000 constant is the nozzle-size convention; it is not replaced by the
machine’s maximum pressure.

At 15 L/min, 2 tips and 2500 PSI, the calculated size is #2.506156 per tip.
Two size #2.5 (025) tips estimate 2512.327 PSI. Two #3.0 tips estimate 1744.672 PSI.
The reference table shows calculated values rounded to two decimals, rather
than duplicating rounded stock-size entries in printed charts.

Important checks
These are estimates assuming full flow reaches equal, unworn tips. Hose,
fittings, swivel losses, bypass flow and wear affect actual pressure.
Pump-side pressure can exceed pressure calculated at the nozzles. Verify
with a suitable gauge and the equipment instructions. Above-rating demands
are intentionally shown uncapped and flagged, not presented as achievable.
Low pressure can stall the cleaner’s rotating bar. Check its minimum flow
and pressure, and confirm nozzle size, thread, angle and component ratings.
This calculator does not set a safe cleaning pressure for sealed concrete.
Comparison sizes are not a stock list or a compatibility recommendation.

References
https://www.catpumps.com/dynamic-literature/high-pressure-design-guide
https://www.catpumps.com/faq
https://www.generalpump.com/wp-content/uploads/2025/10/Nozzle-Chart-2025.pdf

At 15 L/min and 2 equal tips, a 1,000 PSI target requires #3.962581
per tip. Two #4.0 (040) tips estimate 981.378 PSI. This does not establish
surface safety or adequate bar rotation.

GitHub Pages: keep this entire directory at the repository root. All app,
manifest and service-worker paths are relative for project subpaths.
