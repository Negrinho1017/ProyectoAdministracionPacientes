using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Domain.Entities;
using Backend.Persistence.Repository.Implementation;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class MainController : Controller
    {
        PatientManager patientManager;

        public MainController()
        {
            patientManager = new PatientManager();
            patientManager.patientRepository = new PatientRepository();
        }
        [HttpGet]
        public IEnumerable<Patient> Get()
        {
            return patientManager.getAllPatients();
        }

        [HttpGet("{documentNumber}")]
        public Patient Get(string documentNumber)
        {
            return patientManager.getPatientByDocumentNumber(documentNumber);
        }

        [HttpPost]
        public void Post([FromBody]Patient patient)
        {
            patientManager.addPatient(patient);
        }

        [HttpPut("{documentNumber}")]
        public void Put(int documentNumber, [FromBody]Patient patient)
        {
            patientManager.updatePatient(patient);
        }

        [HttpDelete("{documentNumber}")]
        public void Delete(string documentNumber)
        {
            patientManager.deletePatient(documentNumber);
        }
    }
}
