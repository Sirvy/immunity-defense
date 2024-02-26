import * as PIXI from "pixi.js"
import Obstacle from "./Obstacle";
import { Position } from "../../utils/GridUtility";

export default class ObstacleC extends Obstacle {
    constructor(tilePosition: Position) {
        super(tilePosition, 'obstacle_c', PIXI.Texture.from('obstacle_c.png'));
    }
}