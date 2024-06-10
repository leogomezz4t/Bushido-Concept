class GameEngine {
  // Define properties
  // Scene variables
  public scenes: Scene[] = [];
  public currentSceneIndex: number = 0;
  // image paths
  public animationPaths: {} = {};
  // image loading references;
  public requestedSprites: Array<{ sprite: string, callback: (animations: {}) => void }> = [];
  public loadedImages: {} = {};
  // instantiate animations
  public animations: {} = {};
  // fonts
  public fonts: {} = {};
  // preload callbacks

  // animation methods
  public requestSprite(sprite: string, callback: (animations: {}) => void) {
    this.requestedSprites.push(
      {
        sprite: sprite,
        callback: callback
      }
    )
  }


  // Scene methods

  addScene(scene: Scene) {
    scene.game = this;
    this.scenes.push(scene);
  }
  switchScene(id: string);
  switchScene(scene: Scene);
  switchScene(scene: Scene | string) {
    let i;
    if ((typeof scene) === 'string') {
      i = this.scenes.findIndex(x => x.id === scene);
    } else if (scene instanceof Scene) {
      i = this.scenes.indexOf(scene);
    }

    if (i === -1) {
      throw new Error("Tried to switch to scene that does not exist");
    }

    this.currentSceneIndex = i;
  }

  get currentScene() {
    return this.scenes[this.currentSceneIndex];
  }
  // End scene methods

  // P5 js required functions

  preload() { // in a p5js function
    for (const scene of this.scenes) {
      scene.preload();
    }

    this.animationPaths = loadJSON("data/animationPaths.json", () => {
      // Iterate through all images and load them
      for (const sprite in this.animationPaths) {
        this.loadedImages[sprite] = {};
        this.animations[sprite] = {};
        // iterate through the animations
        for (const ani in this.animationPaths[sprite]) {
          this.loadedImages[sprite][ani] = {}
          // iterate through the images
          for (const img of this.animationPaths[sprite][ani]) {
            this.loadedImages[sprite][ani][img] = loadImage(img);
          }

          // Add this animation
          this.animations[sprite][ani] = {
            framesPath: `${sprite}/${ani}`,
            game: this
          }
        }
      }

      // Iterate through requested animations
      for (const req of this.requestedSprites) {
        const anis: {} = {};

        // iterate through the animations of that sprite
        for (const ani in this.animationPaths[req.sprite]) {
          anis[ani] = new SpriteAnimation(`${req.sprite}/${ani}`, this)
        }

        req.callback(anis);
      }

      console.log(this.loadedImages);
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