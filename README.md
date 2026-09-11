# Neon Arcade V3

A GitHub Pages-ready static 3D game portal.

## Games
- Nitro Rush: third-person 3D racing with traffic, lane changes, brake and nitro.
- Red Light: third-person survival race with guard turns, AI runners and elimination.
- Neon Runner: third-person endless runner with jumping and lane switching.
- Starfall: third-person space survival with a visible ship, planet, asteroid field, boost, hull and collisions.

## Local test
Because the games use JavaScript modules, run a local server:

Windows: double-click `start-server.bat`

Or:
`python -m http.server 8000`

Then visit:
`http://localhost:8000`

## GitHub Pages
Upload the contents to `USERNAME.github.io`.

## Internet requirement
Three.js is loaded from jsDelivr. The games therefore need internet access when running unless you later download Three.js into `vendor/`.

## Art
V3 uses procedural geometry so it is self-contained and does not hotlink copyrighted game models. For a future production art pass, replace the placeholder geometry with original or properly licensed GLB/glTF models and animations.
