const randomInt = (min = 0, max = 10, inc = 1) =>
  Math.floor((Math.random() * (max - min)) / inc) * inc + min;

export default randomInt;
