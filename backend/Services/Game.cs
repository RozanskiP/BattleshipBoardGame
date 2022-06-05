using backend.Controllers;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace backend.Services
{
    public class Game
    {
        public int Id { get; set; }

        public Player Player1 { get; set; }

        public Player Player2 { get; set; }

        public int BoardSize { get; set; }

        public int Round { get; set; }

        public bool GameEnded { get; set; }

        public Game(int id, int boardSize)
        {
            this.Id = id;
            this.Player1 = new Player(1, "Computer1", boardSize);
            this.Player2 = new Player(2, "Computer2", boardSize);
            this.Round = 0;
            this.BoardSize = 10;
        }

        Random random = new Random();


        public async void StartGame(IHubContext<GameHubController> hubContext)
        {
            Player1.SetInitialSetup(this.BoardSize);
            Player2.SetInitialSetup(this.BoardSize);

            var isEnded = false;
            do
            {
                Round++;
                isEnded = await OneRound(hubContext);
                
                Thread.Sleep(100);
            } while (!isEnded);
            GameEnded = true;
            await hubContext.Clients.All.SendAsync("ReceiveMessage", this);
        }

        public async Task<bool> OneRound(IHubContext<GameHubController> hubContext)
        {
            Coordinates coordinates = null;

            do
            {
                coordinates = new Coordinates(random.Next(this.BoardSize), random.Next(this.BoardSize));
            } while (!Player1.CheckMove(coordinates));
            

            Player1.MakeMove(coordinates);
            SetMoveAsCorrectType(Player2, coordinates);

            await hubContext.Clients.All.SendAsync("ReceiveMessage", this);
            if (IsWin(Player2))
            {
                Player1.Win = true;
                await hubContext.Clients.All.SendAsync("ReceiveMessage", this);
                return true;
            }

            do
            {
                coordinates = new Coordinates(random.Next(this.BoardSize), random.Next(this.BoardSize));
            } while (!Player2.CheckMove(coordinates));

            Player2.MakeMove(coordinates);
            SetMoveAsCorrectType(Player1, coordinates);
            if (IsWin(Player1))
            {
                Player2.Win = true;
                await hubContext.Clients.All.SendAsync("ReceiveMessage", this);
                return true;
            }

            await hubContext.Clients.All.SendAsync("ReceiveMessage", this);
            return false;
        }

        public void SetMoveAsCorrectType(Player player, Coordinates coordinates)
        {
            var field = player.Board.Where(field => field.Coordinates.X == coordinates.X && field.Coordinates.Y == coordinates.Y).FirstOrDefault();


            if (Field.isShipHit(field.FiledType))
            {
                field.IsHit = true;
                field.IsCheckend = true;
            }
            else
            {
                field.IsHit = false;
            }
        }

        public bool IsWin(Player player)
        {
            var isAnyFieldNotHitted = player.Board.Where(field => !field.IsHit &&
                                                    field.FiledType != FieldType.Empty).ToList();

            if (isAnyFieldNotHitted.Count() > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
