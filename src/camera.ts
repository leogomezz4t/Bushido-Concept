
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

    constructor (worldX: number, worldY: number, scale: number, id: string) {
        this.worldX = worldX;
        this.worldY = worldY;
        this.scale = scale;
        this.id = id;

    }
    
    toCameraCoordinates(x, y) {
        const cameraX = (x - this.worldX)*this.scale;
        const cameraY = (y - this.worldY)*this.scale;
        return [cameraX, cameraY];
    }
    // end static methods

    renderGameObject(go) {
        push();
        scale(this.scale, this.scale);
        const [x, y] = this.toCameraCoordinates(go.x, go.y);
        go.draw(x/this.scale, y/this.scale);
        pop();
    }


    toWorldCoordinates(x, y) {

    }
}