using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Domain.Util
{
    public static class DateUtil
    {
        public static Boolean betweenTwoDates(DateTime date, DateTime beginDate, DateTime endDate)
        {
            return date.Ticks > beginDate.Ticks && date.Ticks < endDate.Ticks;
        }
    }
}
