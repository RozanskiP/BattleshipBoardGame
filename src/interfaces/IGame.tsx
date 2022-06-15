import IPlayer from "./IPlayer";

export default interface IGame {
  id: number;
  player1: IPlayer;
  player2: IPlayer;
  round: number;
  boardSize: number;
  gameEnded: boolean;
}
