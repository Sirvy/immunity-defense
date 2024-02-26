import * as PIXI from "pixi.js"
import { Position } from "../../utils/GridUtility";
import GameObject from "../GameObject";

export default class Enemy extends GameObject {

    protected _HP: number = 10;
    protected _speed: number = 0.5;

    constructor(tilePosition: Position, name?: string, texture?: PIXI.Texture) {
        super(tilePosition, name, texture);
        this.zIndex += 1;
    }

    get HP(): number {
        return this._HP;
    }

    decreaseHP(): void {
        this._HP--;
    }

    get speed(): number {
        return this._speed;
    }
}