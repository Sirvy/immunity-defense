import * as PIXI from "pixi.js"
import { Position } from "../utils/GridUtility";
import GameObject from "./GameObject";
import { TILE_ZINDEX } from "../config/Globals";

export default class ItemOfProtection extends GameObject {
    constructor(tilePosition: Position) {
        super(tilePosition, 'item_of_protection', PIXI.Texture.from('item_of_protection.png'));
    }
}