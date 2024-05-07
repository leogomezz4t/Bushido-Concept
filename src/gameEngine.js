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
    scene.game = this;
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