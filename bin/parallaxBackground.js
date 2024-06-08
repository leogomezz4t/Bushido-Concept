class ParallaxBackground extends GameObject {
    backLayers = [];
    midLayers = [];
    foreLayers = [];
    numLayers;
    // scale
    scale;
    // pos
    offset;
    initialPos;
    // camera
    cameraReference;
    constructor(x, y, scale, numLayers, cameraRef, back, mid, front) {
        super(x, y, null, null, false);
        this.scale = scale;
        this.cameraReference = cameraRef;
        this.initialPos = new Vector2(x, y);
        this.numLayers = numLayers;
        this.offset = Vector2.subtract(this.position, cameraRef.worldPosition);
        // Init all the back layers
        for (let i = -numLayers; i < numLayers; i++) {
            this.backLayers.push(new Background(x + (i * 1280), y, 0.2, this.scale, back, this));
            this.midLayers.push(new Background(x + (i * 1280), y, 0.3, this.scale, mid, this));
            this.foreLayers.push(new Background(x + (i * 1280), y, 0.4, this.scale, front, this));
        }
    }
    onGameEngineDefined() {
        for (let i = 0; i < this.backLayers.length; i++) {
            this.backLayers[i].drawLayer = 0;
            this.midLayers[i].drawLayer = 1;
            this.foreLayers[i].drawLayer = 2;
            this.scene.addGameObject(this.backLayers[i]);
            this.scene.addGameObject(this.midLayers[i]);
            this.scene.addGameObject(this.foreLayers[i]);
        }
    }
    update() {
        this.position = Vector2.add(this.cameraReference.worldPosition, this.offset);
    }
}
