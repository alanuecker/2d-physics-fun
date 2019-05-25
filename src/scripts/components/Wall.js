import { Bodies } from 'matter-js';

const Wall = (x, y, width, height) =>
  Bodies.rectangle(x, y, width, height, {
    label: 'wall',
    isStatic: true,
    render: { lineWidth: 1, fillStyle: 'transparent', strokeStyle: 'white' },
  });

export default Wall;
