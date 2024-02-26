import * as PIXI from "pixi.js"
import Obstacle from "./Obstacle";
import { Position } from "../../utils/GridUtility";

export default class ObstacleB extends Obstacle {
    constructor(tilePosition: Position) {
        super(tilePosition, 'obstacle_b', PIXI.Texture.from('obstacle_b.png'));
    }
}