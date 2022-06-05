import IBoard from "./IBoard";

export default interface IPlayer {
  id: number;
  name: string;
  board: IBoard[];
  enemyBoard: IBoard[];
  win: boolean;
}
