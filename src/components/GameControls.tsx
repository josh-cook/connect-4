import { Button, Checkbox } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { boardState, botState, gameOverState, playerState } from "state";

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);
  const [bot, setBot] = useRecoilState(botState);

  const handleReset = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
  };

  const handleBotToggle = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();

    setBot((bot) => {
      return !bot;
    });
  };

  return (
    <>
      <Button
        onClick={handleReset}
        isDisabled={!board.some((col) => col.length)}
      >
        Reset
      </Button>
      <Checkbox onChange={handleBotToggle} isChecked={bot}>
        Play With Bot
      </Checkbox>
    </>
  );
};

export default GameControls;
