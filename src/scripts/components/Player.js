import { Body, Bodies, World } from 'matter-js';

export default class Player {
  constructor({ x, y, world }) {
    this.width = 50;

    this.keysPressed = { up: false, right: false, left: false };

    this.lastCycle = 0;

    this.initKeyboardHandler();
    this.initPlayer({ x, y, width: this.width, world });
  }

  initKeyboardHandler = () => {
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
  };

  destroy = () => {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  };

  keyDownHandler = (event) => {
    switch (event.keyCode) {
      // right
      case 68:
        this.keysPressed.right = true;
        break;
      // left
      case 65:
        this.keysPressed.left = true;
        break;
      // up
      case 87:
        this.keysPressed.up = true;
        break;
      default:
        break;
    }
  };

  keyUpHandler = (event) => {
    switch (event.keyCode) {
      // right
      case 68:
        this.keysPressed.right = false;
        break;
      // left
      case 65:
        this.keysPressed.left = false;
        break;
      // up
      case 87:
        this.keysPressed.up = false;
        break;
      default:
        break;
    }
  };

  initPlayer = ({ x, y, width, world }) => {
    this.body = Bodies.rectangle(x, y, width, width, {
      label: 'player',
      slop: 0.05,
      friction: 1,
      frictionStatic: Infinity,
      render: {
        strokeStyle: '#4ECDC4',
        fillStyle: 'transparent',
        lineWidth: 1,
      },
    });

    World.addBody(world, this.body);
  };

  render = (cycle) => {
    if (this.body) {
      let direction = 0;
      if (this.keysPressed.left) direction = -1;
      else if (this.keysPressed.right) direction = 1;

      if (this.keysPressed.up && this.lastCycle + 250 < cycle) {
        Body.setVelocity(this.body, {
          x: direction * 4,
          y: -10,
        });

        this.keysPressed.up = false;
        this.lastCycle = cycle;
      } else if (this.keysPressed.left || this.keysPressed.right) {
        Body.setVelocity(this.body, {
          x: direction * 4,
          y: this.body.velocity.y,
        });
      }
    }
  };
}
