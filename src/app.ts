// Optimizations for p5
// @ts-ignore
p5.disableFriendlyErrors = true;

// Game manager stuff
const game: GameEngine = new GameEngine();
// Assets
let currentFrame: string;

// refs
let whs: WhiteHatSamurai;

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
  background("#2a2f4e");
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

    text(`Sazamurai health: ${whs.hitpoints}/${whs.maxHitpoints}`, 10, 30)

}//end draw

// Scene setups
function setupTestScene(scene: Scene) { // within preload 
  // player
  const player = new Player(CANVAS_WIDTH/2, 100, 10);
  player.debug = false;
  // Floors
  const floor = new WorldObject(-500, CANVAS_HEIGHT-50, 2, "artwork/world/basic_background.png");
  floor.addTag("floor");

  // enemy
  const whiteHat: WhiteHatSamurai = new WhiteHatSamurai(player.position.x -250, 100);
  scene.addGameObject(whiteHat);
  whs = whiteHat;
  // Create a new camera with a reference to player
  const playerCam = new TrackingCamera(1, player);
  scene.addCamera(playerCam);

  scene.setCurrentCamera(playerCam);
  // background
  const background = new ParallaxBackground(-200, -200, 4, playerCam,
    "artwork/world/Background/3.png",
    "artwork/world/Background/2.png",
    "artwork/world/Background/1.png");
  scene.addGameObject(background);

  // Game Manager
  const manager: GameManager = new GameManager();
  manager.playerReference = player;
  scene.setGameManager(manager);

  scene.addGameObject(floor)
  scene.addGameObject(player);
}

function keyPressed() {
  if (key === 'l') {
    loop();
  }
  if (key === ';') {
    noLoop();
  }
}

function mousePressed() {
  console.log(`X: ${mouseX} Y: ${mouseY}`);
}
// classes
