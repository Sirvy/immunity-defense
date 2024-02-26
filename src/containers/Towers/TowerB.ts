import * as PIXI from "pixi.js"
import Tower from "./Tower";
import { Position } from "../../utils/GridUtility";

export default class TowerB extends Tower {
    protected inGameName: string = 'Antibiotics Capsule';
    
    protected _description: string = 'Strong tower';

    protected _range: number = 2;
    protected _intervalBetweenShots: number = 300;
    protected _cost: number = 500;

    constructor(tilePosition: Position) {
        super(tilePosition, 'tower_b', PIXI.Texture.from('tower_b.png'));
    }
}