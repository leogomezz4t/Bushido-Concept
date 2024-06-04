// Optimizations for p5
// @ts-ignore
p5.disableFriendlyErrors = true;

// Game manager stuff
const game: GameEngine = new GameEngine();
// Assets
const fonts = {
  "bushido": null,
  "bushdio_bl": null
}

// refs
let whs: Samurai;

// SCENE SETUP || BEFORE PRELOAD
const testScene: Scene = new Scene(game, 'test');
setupTestScene(testScene);
// DEATH SCENE SETUP
const deathScene: Scene = new Scene(game, "death");
setupDeathScene(deathScene);

// end test scene
game.currentSceneIndex = 0;

// END SCENE SETUP

function preload() {
  // font loading
  fonts["bushdio_bl"] = loadFont("../fonts/bushido/bushidobl.ttf");
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
  fill("red")
  strokeWeight(0.5);
  stroke("black")
  textSize(16);
  text(`FPS: ${frameRate().toFixed(2)}`, CANVAS_WIDTH-90, 15);
  // Detect framerate drops
  if (frameRate() < 45) {
    console.warn("Low frame rate");
  }


}//end draw

// Scene setups
function setupTestScene(scene: Scene) { // within preload 
  // player
  const player = new Player(CANVAS_WIDTH/2, 100, 10);
  player.debug = false;
  // HUD
  const health = new HealthBar(20, 20, 150, 25, player.maxHitpoints);
  health.tracker = player;
  scene.addHUDObject(health);
  // Floors
  const floor = new WorldObject(-500, CANVAS_HEIGHT-50, 2, "artwork/world/basic_background.png", false);
  floor.addHitbox((w, h) => {
    return new Hitbox(0, 5, w, h, CollisionType.Colliding, floor)
  })
  floor.addTag("floor");

  // enemy
  // const whiteHat: WhiteHatSamurai = new WhiteHatSamurai(player.position.x + 600, 100);
  // scene.addGameObject(whiteHat);
  const female: FemaleSamurai = new FemaleSamurai(player.position.x + 600, 100);
  scene.addGameObject(female);
  whs = female;
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

function setupDeathScene(scene: Scene) {
  const background = new GameObject(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, false);
  background.color = "black";
  scene.addGameObject(background);
  // camera
  const cam = new Camera(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 1);
  scene.addCamera(cam);
  scene.setCurrentCamera(cam);
  // Text
  const deathText = new TextObject(
    CANVAS_WIDTH/2,
    CANVAS_HEIGHT/2,
    "You died honorably",
    "bushido_bl",
    64,
    "black",
    "red");
  deathText.strokeThickness = 2;

  scene.addGameObject(deathText);
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
