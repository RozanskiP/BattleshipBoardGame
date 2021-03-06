using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class Field
    {
        public Coordinates Coordinates { get; set; }

        public FieldType FiledType { get; set; }

        public bool IsCheckend { get; set; }

        public bool IsHit { get; set; }

        public static bool isShipHit(FieldType fieldType)
        {
            switch (fieldType)
            {
                case FieldType.Carrier:
                case FieldType.BattleShip:
                case FieldType.Destroyer:
                case FieldType.Submarine:
                case FieldType.PatrolBoat:
                    return true;
                default:
                    return false;
            }
        }
    }
}
