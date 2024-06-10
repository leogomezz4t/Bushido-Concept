// Optimizations for p5
// @ts-ignore
p5.disableFriendlyErrors = true;

// Game manager stuff
const game: GameEngine = new GameEngine();
// Assets
const fonts = {
  "bushido": null,
  "bushidob": null,
  "bushdiobi": null,
  "bushdiobl": null,
  "bushidoi": null,
  "bushdiol": null,
  "bushidos": null,
  "bushidosi": null
}

// refs
let whs: Samurai;

// SCENE SETUP || BEFORE PRELOAD
const testScene: Scene = new Scene(game, 'test');
setupTestScene(testScene);
// DEATH SCENE SETUP
const deathScene: Scene = new Scene(game, "death");
setupDeathScene(deathScene);
// MAIN MENU SCENE
const mainScene: Scene = new Scene(game, "main_menu");
setupMainMenuScene(mainScene);

// end test scene
game.switchScene("main_menu");

// END SCENE SETUP

function preload() {
  // font loading
  fonts["bushido"] = loadFont("../fonts/bushido/bushido.ttf");
  fonts["bushidob"] = loadFont("../fonts/bushido/bushidob.ttf");
  fonts["bushdiobi"] = loadFont("../fonts/bushido/bushidobi.ttf");
  fonts["bushdiobl"] = loadFont("../fonts/bushido/bushidobl.ttf");
  fonts["bushdioi"] = loadFont("../fonts/bushido/bushidoi.ttf");
  fonts["bushidol"] = loadFont("../fonts/bushido/bushidol.ttf");
  fonts["bushidos"] = loadFont("../fonts/bushido/bushidos.ttf");
  fonts["bushidosi"] = loadFont("../fonts/bushido/bushidosi.ttf");

  game.fonts = fonts;
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
  const whiteHat: WhiteHatSamurai = new WhiteHatSamurai(player.position.x + 600, 100);
  scene.addGameObject(whiteHat);
  // const female: FemaleSamurai = new FemaleSamurai(player.position.x + 600, 100);
  // scene.addGameObject(female);
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
    "bushdiobl",
    64,
    "black",
    "red");
  deathText.strokeThickness = 2;

  scene.addGameObject(deathText);
}

function setupMainMenuScene(scene: Scene) {
  // camera
const mainCam = new Camera(CANVAS_WIDTH/2, 450, 1);
  scene.addCamera(mainCam);
  scene.setCurrentCamera(mainCam);

  // Background
  const background = new ParallaxBackground(0, 0, 4, mainCam,
    "artwork/world/Background/3.png",
    "artwork/world/Background/2.png",
    "artwork/world/Background/1.png"
  );
  scene.addGameObject(background);

  // floor
  const floor = new WorldObject(-50, CANVAS_HEIGHT-100, 2, "../artwork/world/main_menu.png", false);
  floor.drawLayer = 4;
  scene.addGameObject(floor);

  // Title
  const title = new TextObject(CANVAS_WIDTH/2, 250, "Bushido", "bushidob", 125, "white", "black");
  title.strokeThickness = 5;
  scene.addGameObject(title);

  // Play button
  const play = new PlayButton(400, 400);
  scene.addGameObject(play);
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
