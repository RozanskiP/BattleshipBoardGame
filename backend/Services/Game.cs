using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class Game
    {
        public int Id { get; set; }

        public Player Player1 { get; set; }

        public Player Player2 { get; set; }

        public int Round { get; set; }

        public Game(int id, int boardSize)
        {
            this.Id = id;
            this.Player1 = new Player(1, "Computer1", boardSize);
            this.Player2 = new Player(2, "Computer2", boardSize);
            this.Round = 0;
        }


        public void StartGame()
        {
            // ustaw statki 1 i 2 gracz
            // w petli az ktos nie wygra przeprowadzaj rundy

            // jak ktos wygra to zakoncz i wyswietl statystyki itp
            Player1.SetInitialSetup();
            Player2.SetInitialSetup();
        }

        public void OneRound()
        {
            // ruch pierwszego gracza
            // sprawdzenie czy nie wygrał
            // ruch 2 gracza
            // sprawdzenie czy nie wygral
        }
    }
}
