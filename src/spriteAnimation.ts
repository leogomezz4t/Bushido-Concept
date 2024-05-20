

/*
* @param framesPath: filepath identifier for the animation directory
* @param game: GameEngine Instance
*/
class SpriteAnimation {
    // propertiesJ
    public framesPath: string;
    public spritePath: string;
    public aniPath: string;
    public game: GameEngine;
    // animation drawing properties
    public currentFrameIndex: number = 0;
    public frozen: boolean = false;
    // delay counting
    private deltaFrameChange: number = 0;
    // orientation
    public orientation: Orientation = Orientation.Left;
    // callbacks
    public onLastFrame: () => void = () => {};
    public onNewFrame: (frameIndex: number) => void = () => {};

    constructor(framesPath, game) {
      this.framesPath = framesPath;
      [this.spritePath, this.aniPath] = this.framesPath.split("/"); 
      this.game = game;
  
      // Add reference to required images in GameEngine
      this.game.requireAnimation(framesPath);
    }
    // Delay related methods
    get frameDelay() {
      const savedDelay = this.game.animationDelays[this.spritePath][this.aniPath];
      if (typeof savedDelay === 'undefined') {
        return FRAME_DELAY;
      } else {
        return savedDelay;
      }
    }
    // Image related methods
    get imagePaths() {
      return this.game.animationPaths[this.spritePath][this.aniPath];
    }
  
    get loadedImages() {
      return this.imagePaths.map(e => this.game.loadedImages[e]);
    }
  
    // display related methods
    nextFrame() {
      if (this.currentFrameIndex >= this.imagePaths.length-1) {
        this.onLastFrame();
        this.currentFrameIndex = 0;
      } else {
        this.currentFrameIndex++;
      }
      // callback
      this.onNewFrame(this.currentFrameIndex);
    }
  
    get currentFrame() {
      return this.loadedImages[this.currentFrameIndex];
    }
  
    drawAnimation(x, y, width, height) { // P5.js function
      // Image mode call
      imageMode(CENTER);
      if (this.orientation === Orientation.Left) { // Reverse the image
        push();
        scale(-1, 1); 
        image(this.currentFrame, -x, y, width, height);
        //draw origin
        if (SHOW_ORIGINS) {
          fill('blue');
          circle(-x, y, 5);
        }
        pop();
      } else { 
        image(this.currentFrame, x, y, width, height);
        if (SHOW_ORIGINS) {
          fill('blue');
          circle(x, y, 5);
        }
      }
    }
  
    // logic related methods
    update(orientation) { // P5.js function
      // Set orientation
      this.orientation = orientation;
      // If frozen do not update
      if (this.frozen) {
        return;
      }
      // delay timing logic starts
      if (this.deltaFrameChange >= this.frameDelay) {
        // Move to the next frame and reset delta frame change
        this.nextFrame();
        this.deltaFrameChange = 0;
      }
  
      this.deltaFrameChange += deltaTime;
      // delay timing logic ends
    }
  }