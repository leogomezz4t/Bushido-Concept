class GameObject {
    position;
    width;
    height;
    color = "red";
    // references
    game;
    scene;
    // hitboxes
    hitboxes = [];
    // movement
    deltaX = 0;
    deltaY = 0;
    // orientation
    orientation = Orientation.Right;
    // tags
    tags = [];
    // Visibility
    isActive = true;
    // draw layers
    drawLayer = MAX_LAYER;
    constructor(x, y, width, height, useDefaultHitbox = false) {
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
        // default hitbox
        if (useDefaultHitbox) {
            this.hitboxes.push(new Hitbox(0, 0, width, height, CollisionType.Colliding, this));
        }
    }
    // tag methods
    addTag(tag) {
        this.tags.push(tag);
    }
    hasTag(tag) {
        return this.tags.includes(tag);
    }
    // end tag methods
    colliding(go) {
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
    overlapping(go) {
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
    overlappingWith() {
        const ret = [];
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
    collidingWith() {
        const ret = [];
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
    boxCast(deltaX, deltaY) {
        // modify the game object
        this.position.x += deltaX;
        this.position.y += deltaY;
        // maintain list of overlapping objects
        let collidingObjects = this.collidingWith();
        // Reset the game object
        this.position.x -= deltaX;
        this.position.y -= deltaY;
        return collidingObjects;
    }
    touchingFloor() {
        const d = (this.deltaY === 0) ? GRAVITY_DELTA : this.deltaY;
        const colls = this.boxCast(0, d);
        return colls.some(x => x.hasTag("floor"));
    }
    move(horizontalChange, verticalChange) {
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
    applyGravity() {
        this.deltaY += GRAVITY_DELTA;
        this.position.y += this.deltaY;
        if (this.touchingFloor()) {
            this.position.y -= this.deltaY;
            this.deltaY = 0;
        }
    }
    delete() {
        const i = this.scene.gameObjects.indexOf(this);
        if (i === -1) {
            throw new Error("Tried to delete gameObject that does not exist");
        }
        this.scene.gameObjects.splice(i, 1);
    }
    onGameEngineDefined() {
    }
    preload() {
    }
    setup() {
    }
    update() {
    }
    draw(cameraX, cameraY) {
        noStroke();
        fill(this.color);
        rect(cameraX, cameraY, this.width, this.height);
    }
}
