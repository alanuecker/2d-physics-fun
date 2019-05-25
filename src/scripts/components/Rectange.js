import { Bodies } from 'matter-js';

const Rectangle = (x, y, width, height, options) =>
  Bodies.rectangle(x, y, width, height, {
    label: 'wall',
    slop: 0.5,
    friction: 1,
    frictionAir: 0.5,
    frictionStatic: Infinity,
    render: {
      strokeStyle: '#20D81A',
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    ...options,
  });

export default Rectangle;
