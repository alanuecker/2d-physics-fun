import { Events } from 'matter-js';

export default class HitCounter {
  constructor({ engine }) {
    Events.on(engine, 'collisionStart', this.detectHit);

    this.counter = 0;
  }

  detectHit = ({ pairs }) => {
    pairs.forEach(({ bodyA, bodyB }) => {
      if (bodyA.label === 'player' && bodyB.label === 'circle') {
        this.counter += 1;
        document.getElementById('hits').textContent = this.counter;
      }
    });
  };
}
