
/*
* Camera represents a viewport to the game world that can be observed by the player
* It's coordinates are the the center of the rectangular view
*/
class Camera {
    // properties
    public worldPosition: Vector2;
    public scale: number;

    constructor (worldX: number, worldY: number, scale: number) {
        this.worldPosition = new Vector2(worldX, worldY);
        this.scale = scale;

    }

    get width(): number {
        return CANVAS_WIDTH * this.scale;
    }

    get height(): number {
        return CANVAS_HEIGHT * this.scale;
    }
    
    toCameraCoordinates(position: Vector2) {
        const cameraX = (position.x - (this.worldPosition.x- this.width/2));
        const cameraY = (position.y - (this.worldPosition.y - this.height/2));
        return new Vector2(cameraX, cameraY);
    }
    // end static methods

    render(go: GameObject | Hitbox) {
        push();
        scale(this.scale, this.scale);
        const pos = this.toCameraCoordinates(go.position);
        go.draw(pos.x, pos.y);
        pop();
    }

    toWorldCoordinates(x, y) {

    }

    update() {

    }
}