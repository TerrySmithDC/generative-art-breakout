Slides:

- have people download and install enviormnet.
  - What is gen art?
    1 Computer powered drawings
    2 We're hands off, you give it instructions and it uses randomness to create something new every time.
    3 Types of generative art
    4 Data driven (3d scans of brains, kinect feeds, strands of DNA data, music)
    5 Algorithm driven (Using math, fibinaci numbers, binary tree, etc)
    6 Pattern driven - grids, spirals, consitant pattern with different effects.
    7 AI
  - Show some examples for hype
- Mention this starts slow and snowballs into more interesting things quickly.
- Show what we'll do today
  - `open demos/workshop-final.js`
- Demo working with
  - What's an svg? What a bitmap?
  - `open demos/coordsWithCanvas.html`
- Step through drawing basics

  - `canvas-sketch sketch/drawingBasics.js`
  - Encourage people to test out drawing.

- Demo working with grids (5 rows, explain the grid)

  - `canvas-sketch sketch/workingWithGrids.js`

- Walkthrough everyone make a grid base

  - `canvas-sketch sketch/workshop.js --new`

  - start with createGrid() function

  ```js
  function createGrid(count = 6, frequency = 1) {
    const points = [];

    return points;
  }
  ```

  - Add loop that pushes coords into the points array

  ```js
  function createGrid(count = 6, frequency = 1) {
    const points = [];

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const size = 150;

        points.push({
          position: [u, v],
          size
        });
      }
    }

    return points;
  }
  ```

  -Talk about u/v positions, maybe log the output before drawing.

  ```js
  const points = createGrid();
  ```

  - In the render, show how to step through the points and draw

    ```js
    points.forEach(({ position: [u, v] }) => {
      // Lerp + margin pushes things in, looks better.
      const x = u * width;
      const y = v * height;

      context.beginPath();
      context.fillStyle = "red";
      context.rect(x - size / 2, y - size / 2, size, size);

      context.fill();
    });
    ```

- Next up is lerp

  - `cmd + c` to stop the sketch
  - `npm i canvas-sketch-util nice-color-palettes`
  - `canvas-sketch sketch/workshop.js`

  - Add lerp import
    `const { lerp } = require("canvas-sketch-util/math");`
  - Update the x + y coords.

  ```js
  const margin = 125;

  const x = lerp(margin, width - margin, u);
  const y = lerp(margin, height - margin, v);
  ```

- Lets add some color

  - Import colors

  ```js
  const colors = require("nice-color-palettes");
  ```

  ```js
  const palette = colors[15];
  ```

  ```js
  context.fillStyle = palette[2];
  ```

  - This looks nicers but lets start making this closer to actual generative art.

  ```js
  const random = require("canvas-sketch-util/random");
  ```

  ```js
  const palette = random.pick(colors);
  ```

  ```js
  context.fillStyle = random.pick(palette);
  ```

- Nice!!! Everyone should start having different looking drawings now.
- Now lets put our macs to work.

  ```js
  const size = Math.abs(random.noise2D(u * frequency, v * frequency)) * 300;
  ```

## Awesome job everyone! Please play and save your images. Share them on slack!
