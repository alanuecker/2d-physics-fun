import { Vector, Events } from 'matter-js';

export default class Camera {
  constructor({ render, engine }) {
    this.render = render;

    this.strength = 10;
    this.origMin = { ...this.render.bounds.min };
    this.origMax = { ...this.render.bounds.max };

    Events.on(engine, 'beforeUpdate', this.moveCamera);
  }

  moveCamera = () => {
    const { min, max } = this.render.bounds;

    const subMin = {
      x: 0.1 * (this.origMin.x - min.x),
      y: 0.1 * (this.origMin.y - min.y),
    };
    const subMax = {
      x: 0.1 * (this.origMax.x - max.x),
      y: 0.1 * (this.origMax.y - max.y),
    };

    this.render.bounds.min = Vector.add(this.origMin, subMin);
    this.render.bounds.max = Vector.add(this.origMax, subMax);

    if (this.strength < 10) this.strength += 1;
  };

  screenShake = ({ vector }) => {
    if (this.strength > 0) {
      console.log(this.render.bounds);
      this.render.bounds.min.x += vector.x;
      this.render.bounds.min.y += vector.y;
      this.render.bounds.max.x += vector.x;
      this.render.bounds.max.y += vector.y;
      this.strength -= 1;
    }
  };
}
