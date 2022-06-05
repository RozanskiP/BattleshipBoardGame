import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FieldType from "../interfaces/FieldType";
import IBoard from "../interfaces/IBoard";
import { RootState } from "../store/store";

const Board = () => {
  const { id, player1, player2, round, boardSize, gameEnded } = useSelector(
    (state: RootState) => state.Game
  );

  const to2DTable = (board: IBoard[], boardSize: number) => {
    let newArr = [];
    let newBoard = cloneDeep(board);
    if (board && board?.length !== 0) {
      while (newBoard.length) {
        newArr.push(newBoard.splice(0, boardSize));
      }
    }
    return newArr;
  };

  useEffect(() => {
    if (gameEnded) {
      ShowWinner();
    }
  }, [gameEnded]);

  const ShowWinner = () => {
    alert(
      `GAME IS OVER - ${
        player1.win ? player1.name : player2.name
      } WIN in ${round} round - game id: ${id}`
    );
  };

  const toSpecificType = (
    fieldType: number,
    isCheckend: boolean,
    isHit: boolean
  ) => {
    switch (fieldType) {
      case FieldType.Empty:
        return {
          backgroundColor: isCheckend ? "black" : "white",
          textAlign: "center" as "center",
        };
      case FieldType.Carrier:
        return {
          backgroundColor: isHit ? "yellow" : isCheckend ? "black" : "gray",
          textAlign: "center" as "center",
        };
      case FieldType.BattleShip:
        return {
          backgroundColor: isHit ? "yellow" : isCheckend ? "black" : "blue",
          textAlign: "center" as "center",
        };
      case FieldType.Destroyer:
        return {
          backgroundColor: isHit ? "yellow" : isCheckend ? "black" : "red",
          textAlign: "center" as "center",
        };
      case FieldType.Submarine:
        return {
          backgroundColor: isHit ? "yellow" : isCheckend ? "black" : "purple",
          textAlign: "center" as "center",
        };
      case FieldType.PatrolBoat:
        return {
          backgroundColor: isHit ? "yellow" : isCheckend ? "black" : "green",
          textAlign: "center" as "center",
        };
      default:
        return {
          backgroundColor: isCheckend ? "black" : "white",
          textAlign: "center" as "center",
        };
    }
  };

  const setValue = (field: IBoard) => {
    return field.IsHit ? <>X</> : field.filedType;
  };

  return (
    <div>
      <div className="container">
        <h3>{player1.name}</h3>
        <div className="row">
          <div className="col">
            <h4>Ocean grid</h4>
            <table className="table table-bordered">
              <tbody>
                {to2DTable(player1.board, boardSize).map((items) => {
                  return (
                    <tr>
                      {items.map((field: IBoard) => {
                        return (
                          <th
                            style={toSpecificType(
                              field.filedType,
                              field.isCheckend,
                              field.IsHit
                            )}
                          >
                            {setValue(field)}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col">
            <h4>Target grid</h4>
            <table className="table table-bordered">
              <tbody>
                {to2DTable(player1.enemyBoard, boardSize).map((items) => {
                  return (
                    <tr>
                      {items.map((field: IBoard) => {
                        return (
                          <th
                            style={toSpecificType(
                              field.filedType,
                              field.isCheckend,
                              field.IsHit
                            )}
                          >
                            {setValue(field)}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container">
        <h3>{player2.name}</h3>
        <div className="row">
          <div className="col">
            <h4>Ocean grid</h4>
            <table className="table table-bordered">
              <tbody>
                {to2DTable(player2.board, boardSize).map((items) => {
                  return (
                    <tr>
                      {items.map((field: IBoard) => {
                        return (
                          <th
                            style={toSpecificType(
                              field.filedType,
                              field.isCheckend,
                              field.IsHit
                            )}
                          >
                            {setValue(field)}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col">
            <h4>Target gid</h4>
            <table className="table table-bordered">
              <tbody>
                {to2DTable(player2.enemyBoard, boardSize).map((items) => {
                  return (
                    <tr>
                      {items.map((field: IBoard) => {
                        return (
                          <th
                            style={toSpecificType(
                              field.filedType,
                              field.isCheckend,
                              field.IsHit
                            )}
                          >
                            {setValue(field)}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
