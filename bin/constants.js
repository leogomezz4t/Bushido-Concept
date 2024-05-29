const KBM_CONTROLS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SIDE_ATTACK: 65,
    DOWN_ATTACK: 83,
    UP_ATTACK: 68,
    DEFEND: 87,
    DASH: 16
};
// Player values
const PLAYER_WIDTH = 300;
const PLAYER_HEIGHT = 300;
// Debugs
const SHOW_HITBOXES = true;
const SHOW_OVERLAPPING_HITBOXES = false;
const SHOW_COLLIDING_HITBOXES = false;
const SHOW_WEAPON_HITBOXES = true;
const SHOW_ORIGINS = false;
// Orientation
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Left"] = -1] = "Left";
    Orientation[Orientation["Right"] = 1] = "Right";
})(Orientation || (Orientation = {}));
// Canvas
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;
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
