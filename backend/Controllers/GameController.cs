using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GameController : ControllerBase
    {
        private readonly MainService mainService;
        private readonly IHubContext<GameHubController> hubContext;

        public GameController(IHubContext<GameHubController> hubContext)
        {
            this.mainService = new MainService(hubContext);
            this.hubContext = hubContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var gameData = mainService.RunApplication();
            return Ok(gameData);
        }
    }
}
