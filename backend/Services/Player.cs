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

        public int BoardSize { get; set; }

        public List<Field> Board { get; set; }

        public List<Field> EnemyBoard { get; set; }

        Random random = new Random();

        public Player(int id, string name, int boardSize)
        {
            this.Id = id;
            this.Name = name;
            this.BoardSize = boardSize;
            this.Board = new List<Field>();
            this.EnemyBoard = new List<Field>();
        }

        public void SetInitialSetup()
        {
            setBoards();
            setShips();
        }

        private void setBoards()
        {
            for (int i = 0; i < this.BoardSize; ++i)
            {
                for (int j = 0; j < this.BoardSize; ++j)
                {
                    Board
                        .Add(new Field {
                            Coordinates = new Coordinates(i, j),
                            FiledType = FieldType.Empty,
                            IsCheckend = false
                        });

                    EnemyBoard
                        .Add(new Field {
                            Coordinates = new Coordinates(i, j),
                            FiledType = FieldType.Empty,
                            IsCheckend = false
                        });
                }
            }
        }

        private void setShips()
        {
            // Carrier
            tryToSetShip(new Coordinates(random.Next(this.BoardSize),
                random.Next(this.BoardSize)),
            ShipsSizes.Carrier, FieldType.Carrier);
        }

        private bool tryToSetShip(Coordinates coordinates, int shipSize, FieldType fieldType)
        {
            // try to set in all directions in random order
            var shuffleDirections = new List<int>
            {
                0, 1, 2, 3
            }.OrderBy(d => random.Next()).ToList();

            bool isCorrectAdded = false;
            

            shuffleDirections.ForEach(direct =>
            {
                switch (direct)
                {
                    case 0: // up
                        // check if it fit
                        if (coordinates.Y - shipSize >= 0)
                        {
                            var isSomeShipHere = Board.Select(field => field.Coordinates.X == coordinates.X &&
                                            coordinates.Y <= field.Coordinates.Y && 
                                            coordinates.Y - shipSize > field.Coordinates.Y && field.FiledType != FieldType.Empty);

                            // if correct set ship
                            if (!isSomeShipHere.Any())
                            {
                                var fieldsToPutShip = Board.Where(field => field.Coordinates.X == coordinates.X &&
                                            coordinates.Y <= field.Coordinates.Y &&
                                            coordinates.Y - shipSize > field.Coordinates.Y);

                                foreach(Field field in fieldsToPutShip)
                                {
                                    field.FiledType = fieldType;
                                }
                            }
                        }
                        break;
                    case 1: // down

                        break;
                    case 2: // right

                        break;
                    case 3: // left

                        break;
                }
            });

            return isCorrectAdded;
        }
    }
}
