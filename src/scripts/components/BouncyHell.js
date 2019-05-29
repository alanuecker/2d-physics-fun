import { Events, Body, Vector } from 'matter-js';

import Spawner from './Spawner';

export default class BouncyHell {
  constructor({ width, world, engine, camera }) {
    this.camera = camera;

    this.bouncyBalls = [];
    this.bouncyHits = [];

    Events.on(engine, 'collisionStart', this.collectBalls);
    Events.on(engine, 'collisionStart', this.collectHits);
    // the velocity will be reset before the update
    // so we have to save the bouncy balls and apply the force after the update
    Events.on(engine, 'beforeUpdate', this.bounceBalls);
    Events.on(engine, 'beforeUpdate', this.bounceHits);

    this.spawner = new Spawner({ x: 100, y: 100, width: width - 200, height: 100, world });
  }

  collectBalls = ({ pairs }) => {
    this.bouncyBalls = pairs.filter(
      ({ bodyA, bodyB }) =>
        (bodyA.label === 'circle' && bodyB.label === 'wall') ||
        (bodyA.label === 'wall' && bodyB.label === 'circle'),
    );
  };

  collectHits = ({ pairs }) => {
    this.bouncyHits = pairs.filter(
      ({ bodyA, bodyB }) =>
        (bodyA.label === 'circle' && bodyB.label === 'player') ||
        (bodyA.label === 'player' && bodyB.label === 'circle'),
    );
  };

  bounceBalls = () => {
    if (this.bouncyBalls.length) {
      this.bouncyBalls.forEach(({ bodyA, bodyB }) => {
        const body = bodyA.label === 'circle' ? bodyA : bodyB;
        const { velocity } = body;

        const force = {
          x: 8 * Math.sign(velocity.x),
          y: 8 * Math.sign(velocity.y),
        };

        Body.setVelocity(body, force);
      });
    }
  };

  bounceHits = () => {
    if (this.bouncyHits.length) {
      this.bouncyHits.forEach(({ bodyA, bodyB }) => {
        let circle = null;
        let player = null;

        if (bodyA.labe === 'circle') {
          circle = bodyA;
          player = bodyB;
        } else {
          circle = bodyB;
          player = bodyA;
        }

        const { velocity } = circle;
        const { velocity: velocityPlayer } = player;

        const force = {
          x: 8 * Math.sign(velocity.x),
          y: 8 * Math.sign(velocity.y),
        };

        const addedVector = Vector.add(velocity, velocityPlayer);
        const forcePlayer = Vector.neg({ x: 0.25 * addedVector.x, y: 0.25 * addedVector.y });

        Body.setVelocity(circle, force);
        Body.setVelocity(player, forcePlayer);

        this.camera.screenShake({ vector: force });
      });
    }
  };
}
