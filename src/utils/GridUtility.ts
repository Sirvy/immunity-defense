import * as CF from 'colfio';
import * as PIXI from 'pixi.js';
import { Config } from '../config/Config';
import { TILE_ZINDEX } from '../config/Globals';

export type Position = {
    x: number,
    y: number
}

export class GridUtility {

    public static tilePositionEquals(pos1: Position, pos2: Position): boolean {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }

    public static draw2DGrid(scene: CF.Scene): void {
        for (let i = 0; i < Config.SCREEN_WIDTH / Config.TILE_SIZE; i++) {
            for (let j = 0; j < Config.SCREEN_HEIGHT / Config.TILE_SIZE; j++) {
                let sprite = new CF.Sprite('tile', PIXI.Texture.from('tile.png'))
                sprite.position.set(
                    (Config.TILE_SIZE / 2) + (i * Config.TILE_SIZE), 
                    (Config.TILE_SIZE / 2) + (j * Config.TILE_SIZE)
                )
                sprite.anchor.set(0.5)
                scene.stage.addChild(sprite)
            }
        }
    }

    public static drawIsoGrid(scene: CF.Scene, ignoredTile?: Position): void {
        for (let i = 0; i < Config.X_TILES; i++) {
            for (let j = 0; j < Config.Y_TILES; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                if (ignoredTile !== undefined && i == ignoredTile.x && j == ignoredTile.y) {
                    continue;
                }
                let sprite = new CF.Sprite('iso_tile', PIXI.Texture.from('iso_tile.png'))
                const pos: Position = this.getAbsolutePosFromIsoTilePos({x: i, y: j})
                sprite.zIndex = TILE_ZINDEX;
                sprite.position.set(pos.x, pos.y)
                sprite.anchor.set(0.5)
                scene.stage.addChild(sprite)
            }
        }
    }

    public static getIsoTilePosFromAbsolutePosNoRound(absolutePos: Position): Position {
        return {
            x: 
                (absolutePos.x / Config.ISO_TILE_WIDTH)
                - (Config.ISO_OFFSET_X / Config.ISO_TILE_WIDTH)
                + (absolutePos.y / Config.ISO_TILE_HEIGHT)
                - (Config.ISO_OFFSET_Y / Config.ISO_TILE_HEIGHT)
            ,y:
                (-1 * absolutePos.x / Config.ISO_TILE_WIDTH)
                + (Config.ISO_OFFSET_X / Config.ISO_TILE_WIDTH)
                + (absolutePos.y / Config.ISO_TILE_HEIGHT)
                - (Config.ISO_OFFSET_Y / Config.ISO_TILE_HEIGHT)
        }
    }

    public static getIsoTilePosFromAbsolutePos(absolutePos: Position): Position {
        return {
            x: 
                Math.round(
                    (absolutePos.x / Config.ISO_TILE_WIDTH)
                    - (Config.ISO_OFFSET_X / Config.ISO_TILE_WIDTH)
                    + (absolutePos.y / Config.ISO_TILE_HEIGHT)
                    - (Config.ISO_OFFSET_Y / Config.ISO_TILE_HEIGHT)
                ),
            y:
                Math.round(
                    (-1 * absolutePos.x / Config.ISO_TILE_WIDTH)
                    + (Config.ISO_OFFSET_X / Config.ISO_TILE_WIDTH)
                    + (absolutePos.y / Config.ISO_TILE_HEIGHT)
                    - (Config.ISO_OFFSET_Y / Config.ISO_TILE_HEIGHT)
                ) 
        }
    }

    public static getAbsolutePosFromIsoTilePos(isoTilePos: Position): Position {
        return {
            x: 
                Config.ISO_OFFSET_X 
                + (isoTilePos.x * (Config.ISO_TILE_WIDTH / 2))
                - (isoTilePos.y * (Config.ISO_TILE_WIDTH / 2)),
            y:
                Config.ISO_OFFSET_Y
                + (isoTilePos.x * (Config.ISO_TILE_HEIGHT / 2))
                + (isoTilePos.y * (Config.ISO_TILE_HEIGHT / 2))
        }
    }
}