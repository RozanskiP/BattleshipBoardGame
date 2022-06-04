import IBoard from "./IBoard";

export default interface IPlayer {
  id: number;
  name: string;
  boardSize: number;
  board: IBoard[];
  EnemyBoard: IBoard[];
}
