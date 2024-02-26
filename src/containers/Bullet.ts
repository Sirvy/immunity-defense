import * as PIXI from "pixi.js"
import GameObject from "./GameObject";
import { Position } from "../utils/GridUtility";

export default class Bullet extends GameObject {
    constructor(tilePosition: Position) {
        super(tilePosition, 'bullet', PIXI.Texture.from('bullet.png'));
    }
}