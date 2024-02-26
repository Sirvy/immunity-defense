import * as CF from "colfio";

export default class Stats extends CF.Container {

    private _score: number;
    private _hp: number;
    private _money: number;

    constructor(hp: number, money: number, score?: number) {
        super('Stats');
        this._score = score ?? 0;
        this._hp = hp;
        this._money = money;
    }

    get hp(): number {
        return this._hp;
    }

    set hp(hp: number) {
        this._hp = hp;
    }

    get money(): number {
        return this._money;
    }

    set money(money: number) {
        this._money = money;
    }

    get score(): number {
        return this._score;
    }

    set score(score: number) {
        this._score = score;
    }
}