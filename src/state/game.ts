import { boardCols } from "const";
import { atom } from "recoil";
import { Board, Player } from "types";
import localStorageEffect from "./storage";

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
  effects: [localStorageEffect("boardState")],
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
  effects: [localStorageEffect("playerState")],
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
  effects: [localStorageEffect("gameOverState")],
});

export const botState = atom<boolean>({
  key: "botState",
  default: false,
  effects: [localStorageEffect("botState")],
});
