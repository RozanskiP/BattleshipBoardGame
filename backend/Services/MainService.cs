using backend.Controllers;
using backend.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class MainService
    {
        private readonly IHubContext<GameHubController> hubContext;

        public MainService(IHubContext<GameHubController> hubContext)
        {
            this.hubContext = hubContext;
        }

        public async Task<Game> RunApplication(ICreateSimulation createSimulation)
        {
            var game = new Game(1, createSimulation);
            game.StartGame(hubContext);

            return game;
        }
    }
}
