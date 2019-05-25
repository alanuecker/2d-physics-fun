import { Engine, Render, MouseConstraint, Mouse, World } from 'matter-js';

import '../styles/index.css';

import Objects from './components/Objects';

// create engine
const engine = Engine.create();
const { world } = engine;

const width = window.innerWidth;
const height = window.innerHeight - 64;

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

// add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 1,
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

const objects = new Objects({ world, engine, width, height });
