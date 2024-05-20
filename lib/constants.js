const KBM_CONTROLS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    A_ATTACK: 65,
    S_ATTACK: 83,
    D_ATTACK: 68,
    DEFEND: 87
};
// Player values
const PLAYER_WIDTH = 300;
const PLAYER_HEIGHT = 300;
// Debugs
const SHOW_HITBOXES = false;
const SHOW_OVERLAPPING_HITBOXES = false || SHOW_HITBOXES;
const SHOW_COLLIDING_HITBOXES = false || SHOW_HITBOXES;
const SHOW_ORIGINS = false;
// Orientation
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Left"] = -1] = "Left";
    Orientation[Orientation["Right"] = 1] = "Right";
})(Orientation || (Orientation = {}));
// Canvas
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 300;
// Gravity
const GRAVITY_DELTA = 1;
// Animation
const FRAME_DELAY = 100;
// Hitboxes
var CollisionType;
(function (CollisionType) {
    CollisionType[CollisionType["Colliding"] = 0] = "Colliding";
    CollisionType[CollisionType["Overlapping"] = 1] = "Overlapping";
})(CollisionType || (CollisionType = {}));
