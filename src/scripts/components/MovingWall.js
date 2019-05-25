import { Events, Body, World } from 'matter-js';
import Rectangle from './Rectange';

export default class MovingWall {
  constructor({ x, y, width, height, world, engine }) {
    this.body = new Rectangle(x, y, width, height, { isStatic: true, label: 'moving' });

    World.addBody(world, this.body);

    Events.on(engine, 'beforeUpdate', this.updatePosition);
  }

  updatePosition = () => {
    if (this.body) {
      const { position } = this.body;
      const px = position.x - 1;

      // body is static so must manually update velocity for friction to work
      Body.setVelocity(this.body, { x: px - position.x, y: 0 });
      Body.setPosition(this.body, { x: px, y: position.y });
    }
  };
}
