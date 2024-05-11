class SpriteAnimation {
    /*
    * @param framesPath: filepath identifier for the animation directory
    * @param game: GameEngine Instance
    */
    constructor(framesPath, game) {
      this.framesPath = framesPath;
      [this.spritePath, this.aniPath] = this.framesPath.split("\\"); 
      this.game = game;
  
      // animation drawing properties
      this.currentFrameIndex = 0;
  
      // delay counting properties
      this.deltaFrameChange = 0;
  
      // Add reference to required images in GameEngine
      this.game.requireAnimation(framesPath);
      // Orientation variables
      this.orientation = LEFT_ORIENTATION;
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
        this.currentFrameIndex = 0;
      } else {
        this.currentFrameIndex++;
      }
    }
  
    get currentFrame() {
      return this.loadedImages[this.currentFrameIndex];
    }
  
    drawAnimation(x, y, width, height) { // P5.js function
      // Image mode call
      imageMode(CENTER);
      if (this.orientation === LEFT_ORIENTATION) { // Reverse the image
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
    update() { // P5.js function
      // delay timing logic starts
      if (this.deltaFrameChange >= FRAME_DELAY) {
        // Move to the next frame and reset delta frame change
        this.nextFrame();
        this.deltaFrameChange = 0;
      }
  
      this.deltaFrameChange += deltaTime;
      // delay timing logic ends
    }
  }