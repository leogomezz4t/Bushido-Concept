class GameEngine {
  constructor() {
    this.scenes = [];
    this.currentSceneIndex = 0;

    // image paths
    this.animationPaths = {};

    // animation variables
    this.animationDelays = {};

    // image loading references
    this.requiredImages = new Set();
    this.requiredAnimations = new Set();
    this.loadedImages = {};

    // instantiate animations
    this.animations = {} // will be instantiated in preload
  }

  // Image loading methods
  requireImages(animationPath) {
    const [sprite, animation] = animationPath.split("/");
    for (const ani in this.animationPaths[sprite]) {
      for (const img in this.animationPaths[sprite][ani])
        this.requiredImages.add(this.animationPaths[sprite][ani][img]);
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
    this.animationDelays = loadJSON("data/animationDelays.json", () => {
      console.log("animation delays loaded");
      console.log(this.animationDelays)
    });

    this.animationPaths = loadJSON("data/animationPaths.json", () => {
      // Instantiate all sprite animations
      for (const sprite in this.animationPaths) {
        this.animations[sprite] = {}
        for (const animation in this.animationPaths[sprite]) {
          this.animations[sprite][animation] = new SpriteAnimation(`${sprite}/${animation}`, this);
        }
      }

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
      console.log(this.animations);
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