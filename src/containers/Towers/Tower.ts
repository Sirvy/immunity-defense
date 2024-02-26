import * as PIXI from "pixi.js"
import { Position } from "../../utils/GridUtility";
import GameObject from "../GameObject";

export default class Tower extends GameObject {
    
    protected inGameName: string = 'Tower';

    protected _range: number = 1;
    protected _intervalBetweenShots: number = 1000;
    protected _cost: number = 100;
    protected _description: string = 'A Tower';
    
    constructor(tilePosition: Position, name?: string, texture?: PIXI.Texture) {
        super(tilePosition, name, texture);
    }

    get range(): number {
        return this._range
    }

    get cost(): number {
        return this._cost
    }

    get intervalBetweenShots(): number {
        return this._intervalBetweenShots
    }

    get description(): string {
        return this._description
    }

    getInGameName(): string {
        return this.inGameName;
    }
}