import { Bodies } from 'matter-js';

const Platform = (x, y, width, height) =>
  Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    chamfer: 10,
  });

export default Platform;
