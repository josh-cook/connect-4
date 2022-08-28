import { boardRows } from "const";
import { useRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { Board } from "types";

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

const countDiagonal = (board: Board, col: number, row: number, horizontalDirection: -1 | 1, verticalDirection: -1 | 1) => {
  const player = board[col][row];
  let counter = 0;
  for (let i = 1; i < 4; i++) {
    // if the column doesn't exist don't try to find the row. 
    if (board[col + (i * horizontalDirection)]?.[row + (i * verticalDirection)] === player) {
      counter += 1;
    } else {
      break;
    }
  }

  return counter;
}

const testDiagonalWin = (board: Board, col: number, row: number) => {
  const up = 1;
  const down = -1;
  const right = 1;
  const left = -1;

  // Bottom left to top right
  if (countDiagonal(board, col, row, left, down) + countDiagonal(board, col, row, right, up) >= 3) {
    return true;
  }

  // Top left to bottom right
  if (countDiagonal(board, col, row, left, up) + countDiagonal(board, col, row, right, down) >= 3) {
    return true;
  }

  return false;
}

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
      testDiagonalWin(newBoard, col, row) // Did win diagonally
    ) {
      setGameOver(true);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
