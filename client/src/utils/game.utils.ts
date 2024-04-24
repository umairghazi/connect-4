export function getInitialBoard(): string[][] {
  const initialBoard = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      row.push('');
    }
    initialBoard.push(row);
  }
  return initialBoard;
}

export function serializeBoard(board: string[][]): string {
  return board.map(row => row.join('-')).join('|');
}

export function deserializeBoard(serializedBoard: string): string[][] {
  return serializedBoard.split('|').map(row => row.split('-'));
}
