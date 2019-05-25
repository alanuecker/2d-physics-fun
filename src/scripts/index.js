import { Engine, Render, MouseConstraint, Mouse, World } from 'matter-js';

import '../styles/index.css';

import Wall from './components/Wall';
import Player from './components/Player';
import BouncyHell from './components/BouncyHell';
import HitCounter from './components/HitCounter';

// create engine
const engine = Engine.create();
const { world } = engine;

const width = window.innerWidth;
const height = window.innerHeight - 64;
const halfWidth = width / 2;
const halfHeight = height / 2;

// create renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width,
    height,
    wireframes: false,
    background: '#111',
  },
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

const run = (objects, cycle) => {
  window.requestAnimationFrame((c) => run(objects, c));
  Engine.update(engine, 1000 / 144);

  objects.forEach((obj) => obj.render(cycle));
};

const player = new Player({ x: 100, y: 100, world });

World.add(world, [
  // walls
  Wall(halfWidth, 0, width, 50),
  Wall(halfWidth, height, width, 50),
  Wall(width, halfHeight, 50, height),
  Wall(0, halfHeight, 50, width),
]);

const bouncyHell = new BouncyHell({ width, world, engine });
const hitCounter = new HitCounter({ engine });

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
  max: { x: width, y: height },
});

run([player]);
