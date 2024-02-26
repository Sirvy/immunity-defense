import * as PIXI from "pixi.js"
import { Position } from "../../utils/GridUtility";
import GameObject from "../GameObject";

export default class Obstacle extends GameObject {

    constructor(tilePosition: Position, name?: string, texture?: PIXI.Texture) {
        super(tilePosition, name, texture);
    }
    
}