import * as PIXI from "pixi.js"
import Enemy from "./Enemy";
import { Position } from "../../utils/GridUtility";

export default class EnemyA extends Enemy {

    protected _HP: number = 10;
    protected _speed: number = 5;

    constructor(tilePosition: Position) {
        super(tilePosition, 'enemy_a', PIXI.Texture.from('enemy_a.png'));
    }
}