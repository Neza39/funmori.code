# GameTrack Level 3 Templates

This project contains two very short canvas demo games:

- `case1`: a small memory demo
- `case2`: a small UNO-style demo

Each demo is split into its own HTML, CSS, and JavaScript file, so the game code is isolated and easy to move into another project.

## Insert a demo into your own project

1. Copy the matching CSS and JS file into your project.
2. Add the canvas element with the correct `id`.
3. Include the CSS and JS on your page.

Example for `case2`:

```html
<link rel="stylesheet" href="case2.css">
<script src="case2.js" defer></script>

<canvas id="case2-demo-canvas" width="620" height="420"></canvas>
```

Important:

- `case1.js` expects `id="case1-demo-canvas"`
- `case2.js` expects `id="case2-demo-canvas"`

If the `id` matches, the demo will start automatically.
