import EnemyCreationItem from "../containers/EnemyCreationItem";
import GameMap from "../containers/GameMap";
import ItemOfProtection from "../containers/ItemOfProtection";
import { NullMapObject } from "../containers/NullMapObject";

export class PathFinder {
    private map: GameMap;
    private visited: boolean[][];
    private rows: number;
    private cols: number;

    constructor(map: GameMap) {
        this.map = map;
        this.rows = this.map.sizeX;
        this.cols = this.map.sizeY;
        this.visited = Array.from({ length: this.rows }, () =>
            Array(this.cols).fill(false)
        );
    }

    isSafe(row: number, col: number): boolean {
        return (
            row >= 0 &&
            row < this.rows &&
            col >= 0 &&
            col < this.cols &&
            (
                (this.map.getTileObject({x: row, y: col}) instanceof NullMapObject) || 
                (this.map.getTileObject({x: row, y: col}) instanceof ItemOfProtection) || 
                (this.map.getTileObject({x: row, y: col}) instanceof EnemyCreationItem)
             ) &&
            !this.visited[row][col]
        )
    }

    pathExistsDFS(source: [number, number], destination: [number, number]): boolean {
        if (source[0] === destination[0] && source[1] === destination[1]) {
            return true;
        }

        this.visited[source[0]][source[1]] = true;

        const neighbors = [
            [-1, 0], // Up
            [0, -1], // Left
            [1, 0], // Down
            [0, 1], // Right
        ];

        for (const [dx, dy] of neighbors) {
            const newRow = source[0] + dx;
            const newCol = source[1] + dy;

            if (this.isSafe(newRow, newCol)) {
                if (this.pathExistsDFS([newRow, newCol], destination)) {
                    return true;
                }
            }
        }

        return false;
    }


    bfs(start: [number, number], destination: [number, number]): [number, number][] | null {
        const queue: [number, number, [number, number][]][] = []
        const initialPath: [number, number][] = [start]
        queue.push([start[0], start[1], initialPath])

        while (queue.length > 0) {
            const [row, col, path] = queue.shift()!

            if (row === destination[0] && col === destination[1]) {
                return path
            }

            this.visited[row][col] = true

            const neighbors = [
                [-1, 0], // Up
                [0, -1], // Left
                [1, 0],  // Down
                [0, 1]   // Right
            ];

            for (const [dx, dy] of neighbors) {
                const newRow = row + dx
                const newCol = col + dy

                if (this.isSafe(newRow, newCol)) {
                    queue.push([newRow, newCol, [...path, [newRow, newCol]]])
                    this.visited[newRow][newCol] = true
                }
            }
        }

        return null;
    }

    findPath(start: [number, number], destination: [number, number]): [number, number][] | null {
        if (!this.isSafe(destination[0], destination[1])) {
            console.error("Invalid destination point")
            return null
        }

        return this.bfs(start, destination)
    }
}