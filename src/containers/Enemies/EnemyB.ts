import * as PIXI from "pixi.js"
import Enemy from "./Enemy";
import { Position } from "../../utils/GridUtility";

export default class EnemyB extends Enemy {

    protected _HP: number = 20;
    protected _speed: number = 1;

    constructor(tilePosition: Position) {
        super(tilePosition, 'enemy_b', PIXI.Texture.from('enemy_b.png'));
    }
}