const manifoldColors = {
  white: "#FFF",
  offWhite: "#F7F7F8",
  grayLightest: "#F5F7F9",
  grayLighter: "#ECECED",
  grayLight: "#DDDDDE",
  grayMed: "#CFCFCF",
  gray: "#8F8F95",
  grayDark: "#575B5F",
  grayDarker: "#323940",
  black: "#000",
  border: "#C4C7CA",
  borderDark: "#A9ADB2",
  borderLight: "#E2E5E9",
  purple: "#7748D1",
  blueDark: "#1A4898",
  blue: "#1E50DA",
  blueLight: "#4A90E2",
  bluePale: "#DDE9FE",
  bluePaler: "#C3D6F7",
  orange: "#FE714B",
  orangeDark: "#E46407",
  orangePale: "#FFCAA5",
  magenta: "#B45877",
  red: "#D50F49",
  redPale: "#FFC4D2",
  teal: "#0FB5D0",
  green: "#31BAA2",
  greenDark: "#008A54",
  greenPale: "#A4EACF",
  yellow: "#FFDE52",
  yellowPale: "#FFF2B9"
};

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

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
  // ------------------------------------
  // Code here
  // ------------------------------------

  return ({ context, width, height }) => {
    context.rect(0, 0, width, height);
    context.stroke();
  };
};

canvasSketch(sketch, settings);
