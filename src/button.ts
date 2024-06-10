class Button extends GameObject {
    private readonly BASIC_COLOR: string = "#dadada";
    private readonly HOVER_COLOR: string = "#c0c0c0";
    private readonly CLICK_COLOR: string = "#a7a7a7";

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, true);
    }

    public update(): void {
        if (this.isPressed()) {
            this.onClick();
        }
    }    

    public onClick(): void {};

    public draw(cameraX: number, cameraY: number): void {
        if (this.isPressed()) {
            fill(this.CLICK_COLOR);
        } else if (this.isHovered()) {
            fill(this.HOVER_COLOR);
        } else {
            fill(this.BASIC_COLOR);
        }
        stroke("black");
        rect(cameraX, cameraY, this.width, this.height);
    }
}