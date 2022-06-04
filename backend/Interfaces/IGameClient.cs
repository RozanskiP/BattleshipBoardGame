using backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IGameClinet
    {
        Task ReceiveMessage(string message);
    }
}
