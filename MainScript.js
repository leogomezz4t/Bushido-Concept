// Game manager stuff
const game = new GameEngine();
// Assets

function setup() {
  let sketch = createCanvas(300, 300);
  sketch.parent("mycanvas");

  // Setup scenes
  const testScene = new Scene();
  setupTestScene(scene);

  game.addScene(
    testScene
  );
  // end test scene
  game.currentSceneIndex = 0;
}//end setup

function draw() {
  background(200, 150, 80);
  // Run game
  game.loopPrelude();
  game.drawCurrentScene();
}//end draw

// Scene setups
function setupTestScene(scene) {
  
}


// classes
