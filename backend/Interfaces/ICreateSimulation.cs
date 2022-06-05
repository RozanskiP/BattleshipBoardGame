using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public class ICreateSimulation
    {
        public int Algorithm { get; set; }

        public int BoardSize { get; set; }
    }
}
