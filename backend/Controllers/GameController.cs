using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly MainService mainService;
        private readonly IHubContext<GameHubController> hubContext;

        public GameController(IHubContext<GameHubController> hubContext)
        {
            this.mainService = new MainService(hubContext);
            this.hubContext = hubContext;
        }

        [HttpPost]
        public IActionResult Post([FromBody]ICreateSimulation createSimulation)
        {
            var gameData = mainService.RunApplication(createSimulation);
            return Ok(gameData);
        }
    }
}
