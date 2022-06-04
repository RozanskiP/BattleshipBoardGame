using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.Entities
{
    public class Game
    {
        public int Uuid { get; set; }

        public string Name { get; set; }

        public int[] Board { get; set; }

        public int Size { get; set; }
    }
}
