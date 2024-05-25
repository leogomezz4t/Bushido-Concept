class Hitbox {
    public offset: Vector2;
    public width: number;
    public height: number;
    public parentObject: GameObject;

    public type: CollisionType;
    
    public debug: boolean;
    
    constructor(xOffset: number, yOffset: number, width: number, height: number, type: CollisionType, parentObject: GameObject, debug: boolean = false) {
        this.offset = new Vector2(xOffset, yOffset);

        this.width = width;
        this.height = height;
        this.parentObject = parentObject;
        // depends whether this hitbox collides with game objects
        this.type = type;
        // Debug
        this.debug = debug;
    }

    private get x() {
        if (this.parentObject.orientation === Orientation.Left) {
            return this.parentObject.position.x - this.offset.x - this.width;
        } else {
            return this.parentObject.position.x + this.offset.x;
        }
        
    }

    private get y() {
        return this.parentObject.position.y + this.offset.y;
    }  

    public get position() {
        return new Vector2(this.x, this.y);
    }

    public get debugColor() {
        if (this.type === CollisionType.Colliding) {
            return "green";
        } else if (this.type === CollisionType.Overlapping) {
            return "red"
        }
    }
    
    overlapping(hb: Hitbox) {
        return (
        this.x + this.width > hb.x
        && this.x < hb.x + hb.width
        && this.y + this.height > hb.y
        && this.y < hb.y + hb.height
      );
    }

    _draw(cameraX: number, cameraY: number) {
        // hitbox
        noFill();
        stroke(this.debugColor);
        strokeWeight(3);
        rect(cameraX, cameraY, this.width, this.height); 

        // draw the origin
        fill("blue");
        strokeWeight(0);
        circle(cameraX, cameraY, 5);

    }

    draw(cameraX: number, cameraY: number) {
        // if not active dont draw
        if (!this.parentObject.isActive) {
            return;
        }
        if (SHOW_HITBOXES) {
            this._draw(cameraX, cameraY);
        } else if (SHOW_COLLIDING_HITBOXES && this.type === CollisionType.Colliding) {
            this._draw(cameraX, cameraY);   
        } else if (SHOW_OVERLAPPING_HITBOXES && this.type === CollisionType.Overlapping) {
            this._draw(cameraX, cameraY);
        } if (SHOW_WEAPON_HITBOXES && this.parentObject instanceof Weapon) {
            this._draw(cameraX, cameraY);
        } else if (this.debug) {
            this._draw(cameraX, cameraY);
        }
    }
}