

// Game manager stuff
const game = new GameEngine();
// Assets

// SCENE SETUP || BEFORE PRELOAD
const testScene = new Scene();
setupTestScene(testScene);

game.addScene(
  testScene
);
// end test scene
game.currentSceneIndex = 0;

// END SCENE SETUP

function preload() {
  console.log("preload")
  game.preload();
}

function setup() {
  console.log("setup")
  let sketch = createCanvas(300, 300);
  sketch.parent("mycanvas");

  // Game setup
  game.setup();
}//end setup

function draw() {
  background(200, 150, 80);
  // Run game
  game.loopPrelude();
  game.drawCurrentScene();
}//end draw

// Scene setups
function setupTestScene(scene) { // within preload
  const anim = new SpriteAnimation("run", "bushido\\idle_anim_with_sword", 125, game);
  const go = new GameObject(100, 100, 150, 150, anim);
  scene.addGameObject(go);
}


// classes
