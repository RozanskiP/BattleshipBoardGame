import ICoordinates from "./ICoordinates";

export default interface IBoard {
  coordinates: ICoordinates;
  filedType: number;
  isCheckend: boolean;
}
