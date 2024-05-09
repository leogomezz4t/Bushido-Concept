

// Game manager stuff
const game = new GameEngine();
// Assets

// SCENE SETUP || BEFORE PRELOAD
const testScene = new Scene(game);
setupTestScene(testScene);

// end test scene
game.currentSceneIndex = 0;

// END SCENE SETUP

function preload() {
  console.log("preload")
  game.preload();
}

function setup() {
  console.log("setup")
  let sketch = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
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
  const player = new Player(100, 100, 200, 200, 10, "bushido");
  const enemy = new GameObject(30, 100, 50, 50);
  scene.addGameObject(enemy)
  scene.addGameObject(player);
  console.log("Yurrr")
}


// classes
