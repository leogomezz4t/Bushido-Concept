class Scene {
    gameObjects = [];
    game;
    // camera
    currentCamera;
    cameras = [];
    // References
    manager;
    constructor(gameEngine) {
        this.game = gameEngine;
        // Call add scene on self
        this.game.addScene(this);
    }
    // Manager methods
    setGameManager(m) {
        this.manager = m;
    }
    // Camera methods
    addCamera(c) {
        this.cameras.push(c);
    }
    setCurrentCamera(c) {
        // Check if camera exists
        if (!this.cameras.includes(c)) {
            throw new Error("Tried to set non existent camera");
        }
        this.currentCamera = c;
    }
    // End camera methods
    // Game Object methods
    addGameObject(go) {
        go.game = this.game;
        go.scene = this;
        go.onGameEngineDefined();
        this.gameObjects.push(go);
    }
    preload() {
        for (const go of this.gameObjects) {
            go.preload();
        }
    }
    setup() {
        for (const go of this.gameObjects) {
            go.setup();
        }
    }
    update() {
        // TODO remove
        if (keyIsDown(79)) {
            this.currentCamera.scale -= 0.01;
        }
        if (keyIsDown(80)) {
            this.currentCamera.scale += 0.01;
        }
        // Update all cameras
        for (const c of this.cameras) {
            c.update();
        }
        // update all game objects
        for (let i = 0; i < MAX_LAYER + 1; i++) {
            for (const go of this.gameObjects) {
                if (go.drawLayer !== i) {
                    continue;
                }
                go.update();
                this.currentCamera.render(go);
            }
        }
        // draw hitboxes
        for (const go of this.gameObjects) {
            for (const hb of go.hitboxes) {
                this.currentCamera.render(hb);
            }
        }
    }
}
