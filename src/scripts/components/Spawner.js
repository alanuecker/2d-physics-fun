import { World } from 'matter-js';

import Circle from './Circle';
import randomInt from '../utils/random';

export default class Spawner {
  constructor({ x, y, width, height, world }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.world = world;

    this.spawner = [];

    this.spawn({ amount: 10 });
  }

  spawn = ({ amount }) => {
    const { x, y, width, height, spawner } = this;

    const objs = [];

    for (let i = 0; i < amount; i += 1) {
      objs.push(new Circle(randomInt(x, x + width, 50), randomInt(y, y + height, 50), 20));
    }

    spawner.push(...objs);

    World.add(this.world, objs);
  };
}
