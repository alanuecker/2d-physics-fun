import { Bodies } from 'matter-js';

const Rectangle = (x, y, width, height) =>
  Bodies.rectangle(x, y, width, height, {
    slop: 0.5,
    friction: 1,
    frictionStatic: Infinity,
  });

export default Rectangle;
