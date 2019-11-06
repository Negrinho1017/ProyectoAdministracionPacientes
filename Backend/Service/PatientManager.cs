using Backend.Domain.Entities;
using Backend.Persistence.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Service
{
    public class PatientManager
    {
        public IPatientRepository<Patient> patientRepository;

        public IEnumerable<Patient> getAllPatients()
        {
            if (patientRepository.List().Count() == 0)
            {
                patientRepository.Add(new Patient("Carlos", "Martínez", "CC", "1", "3006009000", "carlos.martinez@hotmail.com", new DateTime(2000, 7, 15), "Colombia", "Medellín"));
                patientRepository.Add(new Patient("Camila", "Pérez", "CC", "2", "3006008000", "camila.perez@gmail.com", new DateTime(1998, 11, 5), "Colombia", "Cali"));
                patientRepository.Add(new Patient("John", "Dale", "CE", "3", "170039933", "john.dale@yahoo.com", new DateTime(1990, 1, 30), "Estados Unidos", "Utah"));
            }
            return patientRepository.List();
        }

        public Patient getPatientByDocumentNumber(string documentNumber)
        {
            return patientRepository.GetById(documentNumber);
        }

        public void addPatient(Patient patient)
        {
            patientRepository.Add(patient);
        }

        public void updatePatient(Patient patient)
        {
            patientRepository.Edit(patient);
        }

        public void deletePatient(string documentNumber)
        {
            patientRepository.Delete(documentNumber);
        }
    }
}
