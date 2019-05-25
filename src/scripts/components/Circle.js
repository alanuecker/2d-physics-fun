import { Bodies } from 'matter-js';

const Circle = (x, y, radius) =>
  Bodies.circle(x, y, radius, {
    label: 'circle',
    slop: 0.5,
    friction: 1,
    frictionStatic: Infinity,
    restitution: 1,
    render: {
      strokeStyle: '#C44D58',
      fillStyle: 'transparent',
      lineWidth: 1,
    },
  });

export default Circle;
