import * as PIXI from "pixi.js";
import Tower from "./Tower";
import { Position } from "../../utils/GridUtility";

export default class TowerA extends Tower {
    protected inGameName: string = 'Immunity Shield';
    
    protected _description: string = 'Weak tower';

    protected _range: number = 1;
    protected _intervalBetweenShots: number = 500;
    protected _cost: number = 100;

    constructor(tilePosition: Position) {
        super(tilePosition, 'tower_a', PIXI.Texture.from('tower_a.png'));
    }
}