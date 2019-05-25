import { Events, Body } from 'matter-js';

import Spawner from './Spawner';

export default class BouncyHell {
  constructor({ width, world, engine }) {
    this.bouncyBalls = [];

    Events.on(engine, 'collisionStart', this.collectBalls);
    // the velocity will be reset before the update
    // so we have to save the bouncy balls and apply the force after the update
    Events.on(engine, 'beforeUpdate', this.bounceBalls);

    this.spawner = new Spawner({ x: 100, y: 100, width: width - 200, height: 100, world });
  }

  collectBalls = ({ pairs }) => {
    this.bouncyBalls = pairs.filter(
      ({ bodyA, bodyB }) =>
        (bodyA.label === 'circle' && bodyB.label === 'wall') ||
        (bodyA.label === 'wall' && bodyB.label === 'circle'),
    );
  };

  bounceBalls = () => {
    if (this.bouncyBalls.length) {
      this.bouncyBalls.forEach(({ bodyA, bodyB }) => {
        const body = bodyA.label === 'circle' ? bodyA : bodyB;
        const { velocity } = body;

        const force = {
          x: 10 * Math.sign(velocity.x),
          y: 10 * Math.sign(velocity.y),
        };

        Body.setVelocity(body, force);
      });
    }
  };
}
