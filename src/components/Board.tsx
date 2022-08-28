import { Circle, Flex } from "@chakra-ui/react";
import { boardRows, playerColor } from "const";
import { usePlayPieceWithBot } from "hooks";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { Player } from "types";

/**
 * https://jsben.ch/K2bj0 - 40% faster than original (commented below)
 * const padCol = (col: number[]): number[] =>
 *   col.join("").padEnd(boardRows, "0").split("").map(Number);
 */
const padColOptimisation = (col: number[]) => {
  let columnCopy = col.slice();

  while (columnCopy.length < boardRows) {
    columnCopy.push(0);
  }

  return columnCopy;
};

const Board: FC = () => {
  const play = usePlayPieceWithBot();
  const board = useRecoilValue(boardState);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);

  return (
    <Flex justify="center">
      {board.map((col, i) => (
        <Flex
          key={i}
          role="group"
          onClick={() => play(i)}
          flexDirection="column-reverse"
          cursor={gameOver ? "auto" : "pointer"}
        >
          {padColOptimisation(col).map((p, j) => (
            <Circle
              m={1}
              size="40px"
              key={`${i}-${j}`}
              boxShadow="inner"
              bg={playerColor[p as Player] || "gray.300"}
            />
          ))}
          <Circle
            m={1}
            size="40px"
            boxShadow="base"
            visibility="hidden"
            bg={playerColor[player]}
            _groupHover={{
              visibility: gameOver ? "hidden" : "visible",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
