class GameObject {
    public position: Vector2;
    public width: number;
    public height: number;
    public color: any = "red";
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
    // Visibility
    public isActive: boolean = true;
    // draw layers
    public drawLayer: number = MAX_LAYER;

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

    overlappingWith(): GameObject[] {
      const ret: GameObject[] = [];
      
      if (!this.isActive) {
        return ret;
      }

      for (const go of this.scene.gameObjects) {
        // dont match with ourselves
        if (go === this) {
          continue;
        }
        // if not active dont show
        if (!go.isActive) {
          continue;
        }

        if (this.overlapping(go)) {
          ret.push(go);
        }
      }

      return ret;
    }

    collidingWith(): GameObject[] {
      const ret: GameObject[] = [];
      
      if (!this.isActive) {
        return ret;
      }

      for (const go of this.scene.gameObjects) {
        // dont match with ourselves
        if (go === this) {
          continue;
        }
        // if not active dont show
        if (!go.isActive) {
          continue;
        }

        if (this.colliding(go)) {
          ret.push(go);
        }
      }

      return ret;
    }

    boxCast(deltaX: number, deltaY: number): GameObject[] {
      // modify the game object
      this.position.x += deltaX;
      this.position.y += deltaY;
      // maintain list of overlapping objects
      let collidingObjects: GameObject[] = this.collidingWith();
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
      this.deltaY += verticalChange;
      // Appl
      this.position.x += this.deltaX;
      if (this.collidingWith().filter(x => !(x instanceof Entity)).length > 0) {
        this.position.x -= this.deltaX;
      }
    }

    public applyGravity() {
      this.deltaY += GRAVITY_DELTA;
      this.position.y += this.deltaY;

      if (this.touchingFloor()) {
        this.position.y -= this.deltaY;
        this.deltaY = 0;
      }
    }

    public isHovered() {
      const camPos = this.scene.currentCamera.toCameraCoordinates(this.position);
      
      return (
        mouseX >= camPos.x && mouseX <= (camPos.x + this.width)
        && mouseY >= camPos.y && mouseY <= (camPos.y + this.height)
      )
    }

    public isPressed() {
      if (!mouseIsPressed) {
        return;
      }
      const camPos = this.scene.currentCamera.toCameraCoordinates(this.position);
      
      return (
        mouseX >= camPos.x && mouseX <= (camPos.x + this.width)
        && mouseY >= camPos.y && mouseY <= (camPos.y + this.height)
      )
    }

    public delete() {
      const i = this.scene.gameObjects.indexOf(this);
      if (i === -1) {
        console.error("Tried to delete gameObject that does not exist");
      }

      this.scene.gameObjects.splice(i, 1);
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
      fill(this.color);
      rect(cameraX, cameraY, this.width, this.height);
    }
  }
  