/*
* Camera represents a viewport to the game world that can be observed by the player
* It's coordinates are the the center of the rectangular view
*/
class Camera {
    // properties
    worldPosition;
    scale;
    constructor(worldX, worldY, scale) {
        this.worldPosition = new Vector2(worldX, worldY);
        this.scale = scale;
    }
    get width() {
        return CANVAS_WIDTH * this.scale;
    }
    get height() {
        return CANVAS_HEIGHT * this.scale;
    }
    toCameraCoordinates(position) {
        const cameraX = (position.x - (this.worldPosition.x - this.width / 2));
        const cameraY = (position.y - (this.worldPosition.y - this.height / 2));
        return new Vector2(cameraX, cameraY);
    }
    // end static methods
    render(go) {
        push();
        scale(this.scale, this.scale);
        const { x, y } = this.toCameraCoordinates(go.position);
        go.draw(x, y);
        pop();
    }
    toWorldCoordinates(x, y) {
    }
    update() {
    }
}
