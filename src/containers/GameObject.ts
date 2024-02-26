import * as CF from "colfio";
import * as PIXI from 'pixi.js'
import { GridUtility, Position } from "../utils/GridUtility";

export default class GameObject extends CF.Sprite {
    protected tilePosition: Position;

    constructor(tilePosition: Position, name?: string, texture?: PIXI.Texture) {
        super(name, texture);
        this.tilePosition = tilePosition;
        const absolutePosition = GridUtility.getAbsolutePosFromIsoTilePos(tilePosition);

        this.position.set(absolutePosition.x, absolutePosition.y);
        this.anchor.set(0.5);
        this.zIndex = this.tilePosition.x + this.tilePosition.y;
    }

    getTilePosition(): Position {
        return this.tilePosition;
    }
}