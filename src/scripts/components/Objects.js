import { World, Engine } from 'matter-js';

import Player from './Player';
import Wall from './Wall';
import HitCounter from './HitCounter';
import BouncyHell from './BouncyHell';
import Camera from './Camera';

export default class Objects {
  constructor({ world, engine, render, width, height }) {
    const player = new Player({ x: 100, y: 100, world });

    const halfHeight = height / 2;
    const halfWidth = width / 2;

    World.add(world, [
      // walls
      // top
      Wall(halfWidth, -50, width + 100, 50),
      // bottom
      Wall(halfWidth, height - 25, width + 100, 50),
      // right
      Wall(width + 50, halfHeight, 50, height + 100),
      // left
      Wall(-50, halfHeight, 50, height + 100),
      // poles
      Wall(halfWidth / 2, height - 150, 100, 200),
      Wall(halfWidth + halfWidth / 2, height - 150, 100, 200),
    ]);

    this.camera = new Camera({ render, engine });

    this.bouncyHell = new BouncyHell({ width, world, engine, camera: this.camera });
    // this.wallHell = new WallHell({ width, height, world, engine });
    this.hitCounter = new HitCounter({ engine });

    // this.shield = new Rectangle(200, 200, 200, 30);

    // World.addBody(world, this.shield);

    this.run([player], engine);
  }

  run = (objects, engine, cycle) => {
    window.requestAnimationFrame((c) => this.run(objects, engine, c));
    Engine.update(engine, 1000 / 144);

    objects.forEach((obj) => obj.render(cycle));
  };
}
