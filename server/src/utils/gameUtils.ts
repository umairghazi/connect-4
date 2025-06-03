export function checkWinCondition(boardData: string[][], colorToCheck: string): boolean {
  const checkVertical = (boardData: string[][]): boolean => {
    const numRows = boardData.length;
    const numCols = boardData[0].length;

    for (let col = 0; col < numCols; col++) {
      let count = 0;
      for (let row = 0; row < numRows; row++) {
        if (boardData[row][col] === colorToCheck) {
          count++;
          if (count >= 4) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  };

  const checkHorizontal = (boardData: string[][]): boolean => {
    for (const rowData of boardData) {
      let count = 0;
      for (const cell of rowData) {
        if (cell === colorToCheck) {
          count++;
          if (count >= 4) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  };

  const checkDiagonal = (boardData: string[][]): boolean => {
    // Check for diagonal win (bottom-left to top-right)
    const numRows = boardData.length;
    const numCols = boardData[0].length;
    for (let row = 3; row < numRows; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
        if (
          boardData[row][col] === colorToCheck &&
          boardData[row - 1][col + 1] === colorToCheck &&
          boardData[row - 2][col + 2] === colorToCheck &&
          boardData[row - 3][col + 3] === colorToCheck
        ) {
          return true;
        }
      }
    }

    // Diagonal: top-left to bottom-right
    for (let row = 0; row <= numRows - 4; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
        if (
          boardData[row][col] === colorToCheck &&
          boardData[row + 1][col + 1] === colorToCheck &&
          boardData[row + 2][col + 2] === colorToCheck &&
          boardData[row + 3][col + 3] === colorToCheck
        ) {
          return true;
        }
      }
    }

    return false;
  };
  return checkVertical(boardData) || checkHorizontal(boardData) || checkDiagonal(boardData);
}
