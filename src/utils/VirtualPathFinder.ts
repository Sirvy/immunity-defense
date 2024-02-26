import PriorityQueue from "priority-queue-typescript";

export class VirtualPathFinder {
    private map: number[][];
    private visited: boolean[][];
    private rows: number;
    private cols: number;

    constructor(map: number[][]) {
        this.map = map;
        this.rows = this.map.length;
        this.cols = this.map[0].length;
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
            this.map[row][col] !== 0 &&
            !this.visited[row][col]
        )
    }

    bfs(start: [number, number], destination: [number, number]): [number, number][] | null {
        const queue = new PriorityQueue<[number, number, [number, number][]]>(
            this.rows * this.cols, 
            (a, b) => a[2].length - b[2].length
        );

        const initialPath: [number, number][] = [start];

        queue.add([start[0], start[1], initialPath])

        while (queue.size() > 0) {
            const [row, col, path] = queue.poll()!

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
                    queue.add([newRow, newCol, [...path, [newRow, newCol]]])
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