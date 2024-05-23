// Optimizations for p5
// @ts-ignore
p5.disableFriendlyErrors = true;

// Game manager stuff
const game: GameEngine = new GameEngine();
// Assets
let currentFrame: string;

// SCENE SETUP || BEFORE PRELOAD
const testScene: Scene = new Scene(game);
setupTestScene(testScene);

// end test scene
game.currentSceneIndex = 0;

// END SCENE SETUP

function preload() {
  game.preload();
}

function setup() {
  let sketch = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  sketch.parent("mycanvas");

  // Game setup
  game.setup();
}//end setup

function draw() {
  background(200, 150, 80);
  // Set frame rate
  frameRate(60);
  // Run game
  game.loopPrelude();
  game.drawCurrentScene();
 
    // HUD
    fill("black")
    strokeWeight(0.5);
    stroke("black")
    text(`FPS: ${frameRate().toFixed(2)}`, 10, 15);

}//end draw

// Scene setups
function setupTestScene(scene: Scene) { // within preload 
  const player = new Player(CANVAS_WIDTH/2, 100, 10);

  // Floors
  const floor = new GameObject(-1000, CANVAS_HEIGHT-50, CANVAS_WIDTH*5, 50, true);
  floor.addTag("floor");

  const marker = new GameObject(0, 100, 75, 75, false);
  const otherMarker = new GameObject(CANVAS_WIDTH, 100, 75, 75, false);

  // enemy
  const whiteHat: WhiteHatSamurai = new WhiteHatSamurai(player.position.x + 1000, 100);

  // Create a new camera with a reference to player
  const playerCam = new TrackingCamera(1, player);
  scene.addCamera(playerCam);
  scene.setCurrentCamera(playerCam);

  // Game Manager
  const manager: GameManager = new GameManager();
  manager.playerReference = player;
  scene.setGameManager(manager);

  scene.addGameObject(whiteHat)
  scene.addGameObject(floor)
  scene.addGameObject(player);
  scene.addGameObject(marker);
  scene.addGameObject(otherMarker)
}

function mousePressed() {
  console.log(`X: ${mouseX} Y: ${mouseY}`);
}
// classes
