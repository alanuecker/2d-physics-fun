import {
  Engine,
  Render,
  Body,
  Composites,
  Events,
  MouseConstraint,
  Mouse,
  World,
} from 'matter-js';

import '../styles/index.css';

import Wall from './components/Wall';
import Platform from './components/Platform';
import Rectangle from './components/Rectange';

// create engine
const engine = Engine.create();
const { world } = engine;

const width = window.innerWidth;
const height = window.innerHeight;
const halfWidth = window.innerWidth / 2;
const halfHeight = window.innerHeight / 2;

// create renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width,
    height,
    showVelocity: true,
  },
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

const run = () => {
  window.requestAnimationFrame(run);
  Engine.update(engine, 1000 / 60);
};

// add bodies
const body = Platform(halfWidth, halfHeight, 200, 60);
const size = 50;
let counter = -1;

const stack = Composites.stack(halfWidth - 50, halfHeight - 80 - 6 * size, 1, 6, 0, 0, (x, y) =>
  Rectangle(x, y, size * 2, size),
);

World.add(world, [
  body,
  stack,
  // walls
  Wall(halfWidth, 0, width, 50),
  Wall(halfWidth, height, width, 50),
  Wall(width, halfHeight, 50, height),
  Wall(0, halfHeight, 50, width),
]);

Events.on(engine, 'beforeUpdate', () => {
  counter += 0.0024;

  if (counter < 0) {
    return;
  }

  const px = halfWidth - (halfWidth - 200) * Math.sin(counter);

  // body is static so must manually update velocity for friction to work
  Body.setVelocity(body, { x: px - body.position.x, y: 0 });
  Body.setPosition(body, { x: px, y: body.position.y });
});

// add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
});

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: window.innerWidth, y: window.innerHeight },
});

run();
