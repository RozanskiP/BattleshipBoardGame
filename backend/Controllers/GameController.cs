using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GameController : ControllerBase
    {
        public GameController()
        {
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}
