class GameEngine {
  constructor() {
    this.scenes = [];
    this.currentSceneIndex = 0;

    // image paths
    this.animationPaths = {};

    // image loading references
    this.requiredImages = new Set();
    this.requiredAnimations = new Set();
    this.loadedImages = {};
  }

  // Image loading methods
  requireImages(animationPath) {
    for (const imgPath of this.animationPaths[animationPath]) {
      this.requiredImages.add(imgPath);
    } 
  }

  requireAnimation(animationPath) {
    this.requiredAnimations.add(animationPath);
  }
  // End loading methods

  // Scene methods

  addScene(scene) {
    this.scenes.push(scene);
  }

  get currentScene() {
    return this.scenes[this.currentSceneIndex];
  }
  // End scene methods

  // P5 js required functions

  preload() { // in a p5js function
    loadJSON("data/animationPaths.json", ap => {
      this.animationPaths = ap;

      // Require all images from the animations
      for (const anim of this.requiredAnimations) {
        this.requireImages(anim);
      }

      // Load images logic
      for (const img of this.requiredImages) {
        this.loadedImages[img] = loadImage(img);
      }

      // DEBUGGING
      console.log("IMAGES AND JSON LOADED...");
    });
  }

  setup() { // in a p5js function
    this.currentScene.setup();
  }

  loopPrelude() { // must be run in a p5js function
    noSmooth();
  }

  drawCurrentScene() {
    this.currentScene.update();
  }

  // end P5 js required functions
}

class Scene {
  constructor() {
    this.gameObjects = [];
  }

  // Game Object methods
  addGameObject(go) {
    this.gameObjects.push(go);
  }

  setup() { // p5js function
    for (const go of this.gameObjects) {
      go.setup();
    }
  }

  update() { // p5js function
    // update all game objects
    for (const go of this.gameObjects) {
      go.update();
      go.draw();
    }
  }
}

class GameObject {
  constructor(x, y, width, height, anim) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.anim = anim;
  }

  setup() {

  }

  update() {
    this.anim.update();
  }

  draw() { // p5js
    this.anim.drawAnimation(this.x, this.y, this.width, this.height);
  }
}

class SpriteAnimation {
  /*
  * @param id: a unique string that labels the animation
  * @param framesPath: filepath identifier for the animation directory
  * @param delay: the millisecond delay between frames
  * @param 
  */
  constructor(id, framesPath, delay, game) {
    this.id = id;
    this.framesPath = framesPath;
    this.delay = delay;
    this.game = game;

    // animation drawing properties
    this.currentFrameIndex = 0;

    // delay counting properties
    this.deltaFrameChange = 0;

    // Add reference to required images in GameEngine
    this.game.requireAnimation(framesPath);
  }

  // Image related methods
  get imagePaths() {
    return this.game.animationPaths[this.framesPath];
  }

  get loadedImages() {
    return this.imagePaths.map(e => this.game.loadedImages[e]);
  }

  // display related methods
  nextFrame() {
    if (this.currentFrameIndex >= this.imagePaths.length-1) {
      this.currentFrameIndex = 0;
    } else {
      this.currentFrameIndex++;
    }
  }

  get currentFrame() {
    return this.loadedImages[this.currentFrameIndex];
  }

  drawAnimation(x, y, width, height) { // P5.js function
    image(this.currentFrame, x, y, width, height);
  }

  // logic related methods
  update() { // P5.js function
    // delay timing logic starts
    if (this.deltaFrameChange >= this.delay) {
      // Move to the next frame and reset delta frame change
      this.nextFrame();
      this.deltaFrameChange = 0;
    }

    this.deltaFrameChange += deltaTime;
    // delay timing logic ends
  }
}