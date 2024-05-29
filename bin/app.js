// Optimizations for p5
// @ts-ignore
p5.disableFriendlyErrors = true;
// Game manager stuff
const game = new GameEngine();
// Assets
let currentFrame;
// refs
let whs;
// SCENE SETUP || BEFORE PRELOAD
const testScene = new Scene(game);
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
} //end setup
function draw() {
    background(200, 150, 80);
    // Set frame rate
    frameRate(60);
    // Run game
    game.loopPrelude();
    game.drawCurrentScene();
    // HUD
    fill("black");
    strokeWeight(0.5);
    stroke("black");
    text(`FPS: ${frameRate().toFixed(2)}`, 10, 15);
    text(`Samurai health: ${whs.hitpoints}/${whs.maxHitpoints}`, 10, 30);
} //end draw
// Scene setups
function setupTestScene(scene) {
    // player
    const player = new Player(CANVAS_WIDTH / 2, 100, 10);
    // Floors
    const floor = new WorldObject(0, CANVAS_HEIGHT - 50, 2, "artwork/world/basic_background.png");
    floor.addTag("floor");
    const marker = new GameObject(0, 100, 75, 75, false);
    const otherMarker = new GameObject(CANVAS_WIDTH, 100, 75, 75, false);
    // enemy
    const whiteHat = new WhiteHatSamurai(player.position.x - 250, 100);
    whs = whiteHat;
    // Create a new camera with a reference to player
    const playerCam = new TrackingCamera(1, player);
    scene.addCamera(playerCam);
    scene.setCurrentCamera(playerCam);
    // background
    const backLayer = new Background(-200, -200, "artwork/world/Background/3.png");
    const midLayer = new Background(-200, -200, "artwork/world/Background/2.png");
    const foreLayer = new Background(-200, -200, "artwork/world/Background/1.png");
    backLayer.parallaxEffect = 0.01;
    midLayer.parallaxEffect = 0.15;
    foreLayer.parallaxEffect = 0.5;
    const background = new ParallaxBackground(-200, -200, 4, playerCam, backLayer, midLayer, foreLayer);
    scene.addGameObject(backLayer);
    scene.addGameObject(midLayer);
    scene.addGameObject(foreLayer);
    scene.addGameObject(background);
    // Game Manager
    const manager = new GameManager();
    manager.playerReference = player;
    scene.setGameManager(manager);
    scene.addGameObject(whiteHat);
    scene.addGameObject(floor);
    scene.addGameObject(player);
    scene.addGameObject(marker);
    scene.addGameObject(otherMarker);
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
