using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class MainController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{documentNumber}")]
        public string Get(int documentNumber)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Patient patient)
        {
        }

        // PUT api/values/5
        [HttpPut("{documentNumber}")]
        public void Put(int documentNumber, [FromBody]Patient patient)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{documentNumber}")]
        public void Delete(int documentNumber)
        {
        }
    }
}
