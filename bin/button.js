class Button extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height, true);
    }
    draw(cameraX, cameraY) {
        fill("#d3d3d3");
        stroke("black");
        rect(cameraX, cameraY, this.width, this.height);
    }
}
