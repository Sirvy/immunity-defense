import * as PIXI from "pixi.js"
import { Position } from "../utils/GridUtility";
import GameObject from "./GameObject";
import { TILE_ZINDEX } from "../config/Globals";

export default class EnemyCreationItem extends GameObject {
    constructor(tilePosition: Position) {
        super(tilePosition, 'enemy_creation_item', PIXI.Texture.from('enemy_creation_item.png'));
        this.zIndex = TILE_ZINDEX;
    }
}