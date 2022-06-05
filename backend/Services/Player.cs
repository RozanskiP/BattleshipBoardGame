using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class Player
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Field> Board { get; set; }

        public List<Field> EnemyBoard { get; set; }

        public bool Win { get; set; }

        Random random = new Random();

        public Player(int id, string name)
        {
            this.Id = id;
            this.Name = name;
            this.Board = new List<Field>();
            this.EnemyBoard = new List<Field>();
        }

        public void MakeMove(Coordinates coordinates)
        {
            var enemyBoard = EnemyBoard.Where(field => field.Coordinates.X == coordinates.X &&
                                              field.Coordinates.Y == coordinates.Y).FirstOrDefault();

            enemyBoard.IsCheckend = true;
        }

        public bool CheckMove(Coordinates coordinates)
        {
            var enemyBoard = EnemyBoard.Where(field => field.Coordinates.X == coordinates.X && 
                                              field.Coordinates.Y == coordinates.Y).FirstOrDefault();
            if (enemyBoard.IsCheckend)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public void SetInitialSetup(int boardSize)
        {
            setBoards(boardSize);
            setShips(boardSize);
        }

        private void setBoards(int boardSize)
        {
            for (int i = 0; i < boardSize; ++i)
            {
                for (int j = 0; j < boardSize; ++j)
                {
                    Board
                        .Add(new Field {
                            Coordinates = new Coordinates(i, j),
                            FiledType = FieldType.Empty,
                            IsCheckend = false,
                            IsHit = false,
                        });

                    EnemyBoard
                        .Add(new Field {
                            Coordinates = new Coordinates(i, j),
                            FiledType = FieldType.Empty,
                            IsCheckend = false,
                            IsHit = false,
                        });
                }
            }
        }

        private void setShips(int boardSize)
        {
            tryToSetShip(ShipsSizes.Carrier, FieldType.Carrier, boardSize);

            tryToSetShip(ShipsSizes.BattleShip, FieldType.BattleShip, boardSize);

            tryToSetShip(ShipsSizes.Destroyer, FieldType.Destroyer, boardSize);

            tryToSetShip(ShipsSizes.Submarine, FieldType.Submarine, boardSize);

            tryToSetShip(ShipsSizes.PatrolBoat, FieldType.PatrolBoat, boardSize);
        }

        private void tryToSetShip(int shipSize, FieldType fieldType, int boardSize)
        {
            // try to set in all directions in random order
            var shuffleDirections = new List<int>
            {
                0, 1, 2, 3
            }.OrderBy(d => random.Next()).ToList();

            bool isEnded = false;
            do
            {
                var coordinates = new Coordinates(random.Next(boardSize), random.Next(boardSize));

                shuffleDirections.ForEach(direct =>
                {
                    switch (shuffleDirections[0])
                    {
                        case 0: // up
                            // check if it fit
                            if (coordinates.Y - shipSize >= -1)
                            {
                                var isSomeShipHere = Board.Where(field => field.Coordinates.X == coordinates.X
                                                            && field.Coordinates.Y <= coordinates.Y
                                                            && field.Coordinates.Y > coordinates.Y - shipSize
                                                            && field.FiledType != FieldType.Empty).ToList();

                                // if correct set ship
                                if (!isSomeShipHere.Any())
                                {
                                    var fieldsToPutShip = Board.Where(field => field.Coordinates.X == coordinates.X
                                                            && field.Coordinates.Y <= coordinates.Y
                                                            && field.Coordinates.Y > coordinates.Y - shipSize).ToList();

                                    foreach (Field field in fieldsToPutShip)
                                    {
                                        field.FiledType = fieldType;
                                    }
                                    isEnded = true;
                                    return;
                                }
                            }
                            break;
                        case 1: // down
                            if (coordinates.Y + shipSize <= boardSize)
                            {
                                var isSomeShipHere = Board.Where(field => field.Coordinates.X == coordinates.X
                                                            && field.Coordinates.Y >= coordinates.Y
                                                            && field.Coordinates.Y < coordinates.Y + shipSize
                                                            && field.FiledType != FieldType.Empty).ToList();

                                if (!isSomeShipHere.Any())
                                {
                                    var fieldsToPutShip = Board.Where(field => field.Coordinates.X == coordinates.X
                                                            && field.Coordinates.Y >= coordinates.Y
                                                            && field.Coordinates.Y < coordinates.Y + shipSize).ToList();

                                    foreach (Field field in fieldsToPutShip)
                                    {
                                        field.FiledType = fieldType;
                                    }
                                    isEnded = true;
                                    return;
                                }
                            }
                            break;
                        case 2: // left
                            if (coordinates.X - shipSize >= -1)
                            {
                                var isSomeShipHere = Board.Where(field => field.Coordinates.Y == coordinates.Y
                                                            && field.Coordinates.X <= coordinates.X
                                                            && field.Coordinates.X > coordinates.X - shipSize
                                                            && field.FiledType != FieldType.Empty).ToList();

                                if (!isSomeShipHere.Any())
                                {
                                    var fieldsToPutShip = Board.Where(field => field.Coordinates.Y == coordinates.Y
                                                            && field.Coordinates.X <= coordinates.X
                                                            && field.Coordinates.X > coordinates.X - shipSize).ToList();

                                    foreach (Field field in fieldsToPutShip)
                                    {
                                        field.FiledType = fieldType;
                                    }
                                    isEnded = true;
                                    return;
                                }
                            }
                            break;
                        case 3: // right
                            if (coordinates.X + shipSize <= boardSize)
                            {
                                var isSomeShipHere = Board.Where(field => field.Coordinates.Y == coordinates.Y
                                                            && field.Coordinates.X >= coordinates.X
                                                            && field.Coordinates.X < coordinates.X + shipSize
                                                            && field.FiledType != FieldType.Empty).ToList();

                                if (!isSomeShipHere.Any())
                                {
                                    var fieldsToPutShip = Board.Where(field => field.Coordinates.Y == coordinates.Y
                                                            && field.Coordinates.X >= coordinates.X
                                                            && field.Coordinates.X < coordinates.X + shipSize).ToList();

                                    foreach (Field field in fieldsToPutShip)
                                    {
                                        field.FiledType = fieldType;
                                    }
                                    isEnded = true;
                                    return;
                                }
                            }
                            break;
                    }
                });
            } while (!isEnded);
        }
    }
}
