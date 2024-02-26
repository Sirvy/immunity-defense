import * as PIXI from "pixi.js"
import Obstacle from "./Obstacle";
import { Position } from "../../utils/GridUtility";

export default class ObstacleA extends Obstacle {
    constructor(tilePosition: Position) {
        super(tilePosition, 'obstacle_a', PIXI.Texture.from('obstacle_a.png'));
    }
}