import { useRecoilValue } from "recoil";
import { boardState, botState, playerState } from "state";
import usePlayPiece from "./usePlayPiece";
import { useEffect } from "react";
import { boardRows } from "const";

const usePlayPieceWithBot = () => {
    const isBotEnabled = useRecoilValue(botState);
    const play = usePlayPiece();
    const player = useRecoilValue(playerState);
    const board = useRecoilValue(boardState);

    useEffect(() => {
        if (player === 2 && isBotEnabled) {
            let columnsWithRoom: number[] = [];
            for (let i = 0; i < board.length; i++) {
                if (board[i].length < boardRows) {
                    columnsWithRoom.push(i);
                }
            }

            const index = Math.floor(Math.random() * columnsWithRoom.length);
            play(columnsWithRoom[index]);
        }
    }, [board, isBotEnabled, play, player]) 

    return (col: number) => {
        if (player === 1 || !isBotEnabled) {
            play(col);
        }
    }
}

export default usePlayPieceWithBot;