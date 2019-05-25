import { World, Engine } from 'matter-js';

import Player from './Player';
import Wall from './Wall';
import HitCounter from './HitCounter';
import BouncyHell from './BouncyHell';
import Rectangle from './Rectange';
import WallHell from './WallHell';

export default class Objects {
  constructor({ world, engine, width, height }) {
    const player = new Player({ x: 100, y: 100, world });

    const halfHeight = height / 2;
    const halfWidth = width / 2;

    World.add(world, [
      // walls
      Wall(halfWidth, 0, width, 50),
      Wall(halfWidth, height, width, 50),
      Wall(width, halfHeight, 50, height),
      Wall(0, halfHeight, 50, width),
    ]);

    this.bouncyHell = new BouncyHell({ width, world, engine });
    this.wallHell = new WallHell({ width, height, world, engine });
    this.hitCounter = new HitCounter({ engine });

    this.shield = new Rectangle(200, 200, 200, 30);

    World.addBody(world, this.shield);

    this.run([player], engine);
  }

  run = (objects, engine, cycle) => {
    window.requestAnimationFrame((c) => this.run(objects, engine, c));
    Engine.update(engine, 1000 / 144);

    objects.forEach((obj) => obj.render(cycle));
  };
}
