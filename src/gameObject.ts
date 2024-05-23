class GameObject {
    public position: Vector2;
    public width: number;
    public height: number;
    // references
    public game: GameEngine;
    public scene: Scene;
    // hitboxes
    public hitboxes: Hitbox[] = [];
    // movement
    public deltaX: number = 0;
    public deltaY: number = 0;
    // orientation
    public orientation: Orientation = Orientation.Right;
    // tags
    public tags: string[] = [];

    constructor(x: number, y: number, width: number, height: number, useDefaultHitbox: boolean = false) {
      this.position = new Vector2(x, y);
      this.width = width;
      this.height = height;

      // default hitbox
      if (useDefaultHitbox) {
        this.hitboxes.push(
          new Hitbox(0, 0, width, height, CollisionType.Colliding, this)
        );
      }
    }

    // tag methods
    public addTag(tag: string) {
      this.tags.push(tag);
    }

    public hasTag(tag: string) {
      return this.tags.includes(tag);
    }
    // end tag methods

    colliding(go: GameObject) {
      const myCollidingHitboxes = this.hitboxes.filter(hb => hb.type === CollisionType.Colliding);
      const theirCollidingHitboxes = go.hitboxes.filter(hb => hb.type === CollisionType.Colliding);
      for (const mch of myCollidingHitboxes) {      
        for (const tch of theirCollidingHitboxes) {
          if (mch.overlapping(tch)) {
            return true;
          }
        }
      }

      return false;
    }

    overlapping(go: GameObject): boolean {
      const myOverlappingHitboxes = this.hitboxes.filter(hb => hb.type === CollisionType.Overlapping);
      for (const moh of myOverlappingHitboxes) {
        for (const hb of go.hitboxes) {
          if (moh.overlapping(hb)) {
            return true;
          }
        }
      }

      return false;
    }

    boxCast(deltaX: number, deltaY: number): GameObject[] {
      // modify the game object
      this.position.x += deltaX;
      this.position.y += deltaY;
      // maintain list of overlapping objects
      let collidingObjects: GameObject[] = [];
      // test for overlap
      for (const go of this.scene.gameObjects) {
        if (this === go) {
          continue;
        }

        if (this.colliding(go)) {
          // Reset the game object
          collidingObjects.push(go);
        }
      }
      // Reset the game object
      this.position.x -= deltaX;
      this.position.y -= deltaY;
      return collidingObjects;
    }

   
    touchingFloor(): boolean {
      const d = (this.deltaY === 0) ? GRAVITY_DELTA : this.deltaY;
      const colls = this.boxCast(0, d);

      return colls.some(x => x.hasTag("floor"));
    }

    move(horizontalChange: number, verticalChange: number) { 
      // Reset delta
      this.deltaX = 0;
      // Move  
      this.deltaX += horizontalChange;

      // Apply
      this.position.x += this.deltaX;
    }

    public applyGravity() {
      if (this.touchingFloor()) {
          this.deltaY = 0;
      }

      // Gravity
      if (!this.touchingFloor()) {
            this.deltaY += GRAVITY_DELTA;
      }

      this.position.y += this.deltaY;
    }

    public onGameEngineDefined() {
      
    }

    public preload() {

    }

    public setup() {
  
    }
  
    public update() {

    }
  
    public draw(cameraX: number, cameraY: number) { // p5js
      noStroke();
      fill("red");
      rect(cameraX, cameraY, this.width, this.height);
    }
  }
  