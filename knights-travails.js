function knightMoves(start, end) {
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

  function isValidMove(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function getValidMoves([x, y]) {
    return moves
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([newX, newY]) => isValidMove(newX, newY));
  }

  function bfs() {
    const queue = [[start]];
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const currentPosition = currentPath[currentPath.length - 1];

      if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
        return currentPath;
      }

      const possibleMoves = getValidMoves(currentPosition);
      possibleMoves.forEach((move) => {
        const path = [...currentPath, move];
        const key = move.toString();

        if (!visited.has(key)) {
          visited.add(key);
          queue.push(path);
        }
      });
    }

    console.log("No valid path found.");
    return [];
  }

  const shortestPath = bfs();
  if (shortestPath.length > 0) {
    console.log(
      `You made it in ${shortestPath.length - 1} moves! Here's your path:`,
    );
    shortestPath.forEach((position) => {
      console.log(position);
    });
    return shortestPath;
  }
  return shortestPath;
}

// Test cases
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);