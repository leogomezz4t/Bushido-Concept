class Button extends GameObject {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, true);
    }

    public draw(cameraX: number, cameraY: number): void {
        fill("#d3d3d3");
        stroke("black");
        rect(cameraX, cameraY, this.width, this.height);
    }
}