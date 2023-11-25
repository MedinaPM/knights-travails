class Chessboard {
  constructor() {
    this.size = 8; // Size of the chessboard
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(false),
    );
  }

  isValidMove(x, y) {
    return (
      x >= 0 && x < this.size && y >= 0 && y < this.size && !this.board[x][y]
    );
  }

  markVisited(x, y) {
    this.board[x][y] = true;
  }

  getValidMoves([x, y]) {
    const moves = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ];

    return moves
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([newX, newY]) => this.isValidMove(newX, newY));
  }

  findShortestPath(start, end) {
    const queue = [[start]];
    this.markVisited(start[0], start[1]);

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const currentPosition = currentPath[currentPath.length - 1];

      if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
        const moves = currentPath.map(([x, y]) => `[${x},${y}]`).join("\n    ");
        const movesCount = currentPath.length - 1;
        const message = `You made it in ${movesCount} moves!  Here's your path:\n    ${moves}`;
        console.log(message);
        return currentPath; // Return the shortest path found
      }

      const possibleMoves = this.getValidMoves(currentPosition);

      possibleMoves.forEach((move) => {
        const path = [...currentPath, move];
        const [x, y] = move;

        this.markVisited(x, y);
        queue.push(path);
      });
    }

    console.log("No valid path found.");
    return null; // If no valid path found
  }
}

// Usage example:
const chessboard = new Chessboard();
const start = [0, 0];
const end = [3, 3];
chessboard.findShortestPath(start, end);