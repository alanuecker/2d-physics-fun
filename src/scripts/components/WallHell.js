import { Events, World } from 'matter-js';

import MovingWall from './MovingWall';

export default class WallHell {
  constructor({ width, height, world, engine }) {
    this.world = world;

    Events.on(engine, 'collisionActive', this.detectHit);

    this.initWallGenerator({ width, height, world, engine });
  }

  detectHit = ({ pairs }) => {
    // todo: does not work with static walls
    pairs.forEach(({ bodyA, bodyB }) => {
      if (bodyA.label === 'moving' && bodyB.label === 'wall') {
        World.remove(this.world, bodyA);
      } else if (bodyA.label === 'wall' && bodyB.label === 'moving') {
        World.remove(this.world, bodyB);
      }
    });
  };

  initWallGenerator = ({ width, height, world, engine }) => {
    const wallWidth = 50;
    const wallHeight = 200;

    const wall = new MovingWall({
      x: width - wallWidth / 2 - 60,
      y: height - wallHeight / 2 - 60,
      width: wallWidth,
      height: wallHeight,
      world,
      engine,
    });
  };
}
