// Returns all nodes in the order in which they were visited.
// Makes nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.
export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  let nextNodesStack = [startNode];

  // Keep track of whether we found the finish node
  let finishNodeFound = false;

  while (nextNodesStack.length) {
    const currentNode = nextNodesStack.shift();

    // If we reach the finish node, return the visited nodes in order
    if (currentNode === finishNode) {
      finishNodeFound = true;
      return visitedNodesInOrder;
    }

    // Process only if the node is not a wall and not visited already
    if (
      !currentNode.isWall &&
      (currentNode.isStart || !currentNode.isVisited)
    ) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      const { col, row } = currentNode;
      let nextNode;

      // Check the adjacent nodes (up, down, left, right)
      if (row > 0) {
        nextNode = grid[row - 1][col];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (row < grid.length - 1) {
        nextNode = grid[row + 1][col];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (col > 0) {
        nextNode = grid[row][col - 1];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (col < grid[0].length - 1) {
        nextNode = grid[row][col + 1];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
    }
  }

  // After BFS completes, check if finish node was found
  if (!finishNodeFound) {
    console.log("No path found to the finish node.");
  }

  // Return the visited nodes even if no path was found
  return visitedNodesInOrder;
}
