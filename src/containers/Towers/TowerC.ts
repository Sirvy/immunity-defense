import * as PIXI from "pixi.js"
import Tower from "./Tower";
import { Position } from "../../utils/GridUtility";

export default class TowerC extends Tower {
    protected inGameName: string = 'Crazy Vaccine';
    
    protected _description: string = 'Super tower';

    protected _range: number = 8;
    protected _intervalBetweenShots: number = 300;
    protected _cost: number = 1500;

    constructor(tilePosition: Position) {
        super(tilePosition, 'tower_c', PIXI.Texture.from('tower_c.png'));
    }
}