
/*
* Camera represents a viewport to the game world that can be observed by the player
* It's coordinates are the top left corner of a rectangular view
*/
class Camera {
    // properties
    public worldX: number;
    public worldY: number;
    public scale: number;
    public id: string;

    constructor (worldX, worldY, scale, id) {
        this.worldX = worldX;
        this.worldY = worldY;
        this.scale = scale;
        this.id = id;

    }
    
    // static methods
    toCameraCoordinates(x, y) {
        const cameraX = x - this.worldX;
        const cameraY = y - this.worldY;
        return [cameraX, cameraY];
    }
    // end static methods

    renderGameObject(go) {
        push();
        scale(this.scale, this.scale);
        const [x, y] = this.toCameraCoordinates(go.x, go.y);
        go.draw(x, y);
        pop();
    }


    toWorldCoordinates(x, y) {

    }
}