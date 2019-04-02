function canvasSketch(render, { dimensions = [] }) {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  const [
    userWidth = window.innerWidth,
    userHeight = window.innerHeight
  ] = dimensions;

  const options = {
    context,
    width: userWidth,
    height: userHeight
  };

  const { width, height } = options;

  canvas.width = width;
  canvas.height = height;

  const draw = render(options);

  draw(options);
}

const settings = {
  dimensions: [800, 800]
};

const sketch = () => {
  const GRID_SIZE = 10;
  const pallete = ["green", "black", "yellow"];

  const getRandonItem = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const createGrid = () => {
    const points = [];

    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const u = x / (GRID_SIZE - 1);
        const v = y / (GRID_SIZE - 1);
        const fontSize = Math.floor(Math.random() * 30) + 10;
        const rotation = Math.random();
        const randomLetters = `→`.split("");
        points.push({
          char: getRandonItem(randomLetters),
          color: getRandonItem(pallete),
          fontSize,
          position: [u, v],
          rotation
        });
      }
    }
    return points;
  };
  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = "#ff88cc";

    context.fillRect(0, 0, width, height);

    points.forEach(({ fontSize, position: [u, v], color, char, rotation }) => {
      // const x = u * width;
      // const y = v * height;
      const margin = 150;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${fontSize}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText(char, 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
