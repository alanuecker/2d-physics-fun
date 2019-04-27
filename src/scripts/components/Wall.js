import { Bodies } from 'matter-js';

const Wall = (x, y, width, height) => Bodies.rectangle(x, y, width, height, { isStatic: true });

export default Wall;
