using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public enum FieldType : short
    {
        Empty = 0,
        Carrier,
        BattleShip,
        Destroyer,
        Submarine,
        PatrolBoat,
    }
}
