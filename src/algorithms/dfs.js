// Returns all nodes in the order in which they were visited.
// Makes nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const nextNodesStack = [];
  nextNodesStack.push(startNode);

  // Keep track of whether we found the finish node
  let finishNodeFound = false;

  while (nextNodesStack.length) {
    const currentNode = nextNodesStack.pop();

    // If we reach the finish node, return the visited nodes
    if (currentNode === finishNode) {
      finishNodeFound = true;
      return visitedNodesInOrder;
    }

    // Process the node if it's not a wall and has not been visited
    if (
      !currentNode.isWall &&
      (currentNode.isStart || !currentNode.isVisited)
    ) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);

      const { col, row } = currentNode;
      let nextNode;

      // Explore neighbors in DFS (Up, Down, Left, Right)

      // Up
      if (row > 0) {
        nextNode = grid[row - 1][col];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }

      // Down
      if (row < grid.length - 1) {
        nextNode = grid[row + 1][col];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }

      // Left
      if (col > 0) {
        nextNode = grid[row][col - 1];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }

      // Right
      if (col < grid[0].length - 1) {
        nextNode = grid[row][col + 1];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
    }
  }

  // After DFS completes, check if the finish node was found
  if (!finishNodeFound) {
    console.log("No path found to the finish node.");
  }

  // Return the visited nodes even if no path was found
  return visitedNodesInOrder;
}
