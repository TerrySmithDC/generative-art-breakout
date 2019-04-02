# Canvas / canvas-sketch cheat sheet

# Canvas

Canvas in itself is a multi hour topic. I'm deliberately not touching on any complex shapes, curved lines, images, or rotations. Feel free to experiment after the workshop!

Things to remember about the canvas, even if its not highlighted today:

- The canvas is a state driven api. This means unless you're using a shortcut api you need to call `fill()` or `stroke()` to draw.
- All coordinates _start_ at the top left corner of the canvas (0,0)

## Drawing Rectangles

`rect(x, y, width, height);` for drawing rectangles and squares.

```js
// Draws a filled rectangle.
context.rect(200, 200, 300, 150);
context.fill();
// Draws the outline of a square.
context.rect(200, 100, 25, 25);
context.stroke();
```

## Drawing Circles

`arc(x, y, radius, startAngle, endAngle);` The arc method is for circles, semi circles and... Arcs.

```js
// Draws a circle 50px
context.arc(75, 75, 50, 0, Math.PI * 2);
context.fill();

// Draws a half circle
context.arc(75, 75, 50, 0, Math.PI * 1);
context.fill();

// Draws 1/4 of a circle
context.arc(75, 75, 50, 0, Math.PI * 0.5);
context.fill();
```

## Drawing Lines

- `beginPath` marks a "pen down" and closes previous unclosed paths.
- `moveTo(x, y)` Moves you on the canvas (instead of starting at `(0,0)`)
- `lineTo(x, y);` Draw a line to provided coords, from the current location.

```js
// Draws a line to provided x, y coordinates.
context.beginPath();
context.moveTo(500, 500);
context.lineTo(100, 75);
context.lineTo(25, 150);
context.lineTo(300, 400);
context.stroke();
```

```js
// Makes a triangle at 75px over on the x axis, and 50px down on the axis.
context.beginPath();
context.moveTo(75, 50);
context.lineTo(100, 75);
context.lineTo(100, 25);
context.fill();
```

## Adding color

`context.fillStyle` and `context.strokeStyle` can be used to set what color you want to draw.

```js
// Draws a red rectangle.
context.fillStyle = "red";
context.rect(75, 75, 100, 200);
context.fill();
```

```js
// Draws a red outline of a circle.
context.strokeStyle = "red";
context.arc(75, 75, 50, 0, Math.PI * 1);
context.stroke();
```

## But what about... Gradients?

- `createLinearGradient(x1, y1, x2, y2)` create a linear gradient a fixed position and will stop at the end coords. If `x2` and `y2` is less then where you place a shape, that shape wont have the gradient, only one of the color stops.
- `addColorStop(0..1, color)` 0..1 is the percentage where the gradient will transition to a new stop. You can have more then two color stops!

```js
// Create a yellow to orange square
const gradientFill = context.createLinearGradient(0, 0, 150, 150);
gradientFill.addColorStop(0, "yellow");
gradientFill.addColorStop(1, "orange");

context.fillStyle = gradientFill;
context.rect(85, 85, 200, 200);
context.fill();
```

## Sizing a canvas

If you're going in without using canvas-sketch (Or we have no internet and I have to SOS) _never_ use CSS to adjust the width and height of the canvas! The canvas 2d context is rendering a rasterize bitmap image. Just like pngs and jpegs, you will just stretch and warp the canvas instead of scaling the size of it. don't be me and then wonder why your circles are ovals!

To resize a canvas element:

```js
const canvas = document.querySelector('<canvas'>);
const context = canvas.getContext('2d');

canvas.width = window.innerwidth;
canvas.height = window.height;
```

[Vanilla canvas getting started tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

# canvas-sketch

## What are UV Coordinates?

These are coordinated that are represented from 0 to 1, if you imagine a box. (0,0) would be the top left, (1,1) would be the bottom right. UV coordinates tend to be easier to work with rather then pixels when working with math and randomness.

Let's look at a 2x2 grid example.

```js
const count = 2;
const points = [];
for (let x = 0; x < count; x++) {
  for (let y = 0; y < count; y++) {
    const u = count <= 1 ? 0.5 : x / (count - 1);
    const v = count <= 1 ? 0.5 : y / (count - 1);
    points.push([u, v]);
  }
}
```

Will result in points having 4 items looking something like this.

| index | u   | v   | Placement    |
| ----- | --- | --- | ------------ |
| 0     | 0   | 0   | Top left     |
| 1     | 0   | 1   | Top right    |
| 2     | 1   | 0   | Bottom left  |
| 3     | 1   | 1   | Bottom right |

Ok so how do we convert this to actually painting on the canvas context? I'll write this a bit verbosely for people not so used to es6.

```js
const width = 400; // Canvas width is say 400px
const height = 400; // Canvas height is say 200px
points.forEach(function(point) {
  const x = point[0] * w;
  const y = point[1] * h;

  // Do something with the x + y
});
```

Or written how you'll see in the breakout session.

```js
const width = 400; // Canvas width is say 400px
const height = 400; // Canvas height is say 200px
points.forEach(([u, v]) => {
  const x = u * width;
  const y = v * height;

  // Do something with the x + y
});
```

Resulting in this

| index | x     | y     | Placement    |
| ----- | ----- | ----- | ------------ |
| 0     | 0     | 0     | Top left     |
| 1     | 0     | 400px | Top right    |
| 2     | 400px | 0     | Bottom left  |
| 3     | 400px | 400px | Bottom right |

As you expand the size of your grid the points become more complex, but have no fear, with the power of uv's and math you can scale your grid up and down, your points will always be pixel perfect!

## How was the spiral done?

This is a pretty heavy handed spiral. I never claimed to be good at writing algorithms. :P

```js
const createSpiral = () => {
  const points = [];

  const size = 200;
  const startPoint = 70;

  for (let i = startPoint; i <= size; i++) {
    const angle = 0.1 * i;
    const u = center.x + (a + b * angle) * Math.cos(angle);
    const v = center.y + (a + b * angle) * Math.sin(angle);

    points.push({ position: [u, v], angle });
  }

  return points;
};

const points = createSpriral();
```

## How to load an image or asynchronous call

The function you pass canvasSketch can be an async! You can use this for images, sounds, rest/graphql requests. You can use the regular async/await pattern.

```js
// Image Example
function fetchImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

canvasSketch(async ({ update }) => {
  const image = await fetch("my/image.jpg");

  return ({ context, width, height }) => {
    context.drawImage(image, 0, 0, width, height);
  };
});
```

## How to make prints?

Add this to your sketch settings. There are more options, check the [docs](https://github.com/mattdesl/canvas-sketch/blob/master/docs/physical-units.md#paper-size-presets)

```js
const settings = {
  pixelsPerInch: 300,
  dimensions: "A4",
  units: "in"
};
```

## I want to host my sketch online

By running this command you can build a packaged version of your sketch. [docs](https://github.com/mattdesl/workshop-generative-art/blob/master/docs/cloning.md#bundling-to-a-static-website)

```
canvas-sketch src/my-new-sketch.js --build --inline
```

# Miscellaneous Generative Art Tips

If you don't want to set up your own color scheme [Nice Color Palletes](https://www.npmjs.com/package/nice-color-palettes) is a great package that pulls in 500 palettes you can use.

## Canvas-sketch-util

## [Random](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md)

The random util provides better randomness then what Javascript provide out of box. I will highlight a few I've found useful.

`random.boolean()` returns `true` or `false`.

`random.pick(array)` Retruns a random item from an array.

- TIP: You can use this with the `nice-collor-palletes` npm module.

`random.noise2D(x, y, frequency, amplitude)` gives something more natural or organic looking then the traditional `Math.random()`

`random.range(min, max)` and `random.rangeFloor(min, max)` returns a random integer or float value between the provided min and max values.

- TIP: You could use this to create a circle with a radius between 20 to 60.

`random.setSeed(n)` let's you set the base seed for randomness. Accepts numbers or strings.

- TIP: If your whole sketch uses the `random` module instead of `Math` using this will let you generate the same sketch again. `random.setSeed('manifold')`. See `sketch/shapes.js`

## [Math](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/math.md)

There's a lot of good stuff in here. I haven't tried them all out yet.

`lerp(min, max, t)` Linear interpolation commonly known as lerp. Interpolates between a given rage, where `t` is in between 0 and 1.

- Example: `lerp(0, 1080, 0.5)` returns `530`, `lerp(0, 1080, 0.33)` returns `349.8`
- TIP: This is great for adding constraints on your ranges. When making a grid, I use `lerp`. This is also handy when working with a looped gif, when there's a predetermined duration. Shout out to easing fans!

`clamp(min, max, t)` Clamps a given number into a range. This is great for protecting against out of range values or negative radius's.

- `clamp(10, 15, 0.5));` // returns 10
- `clamp(10, 15, 13));` // returns 13
- `clamp(10, 15, 20));` // returns 15
