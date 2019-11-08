using Backend.Domain.Entities;
using Backend.Domain.Util;
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
                patientRepository.Add(new Patient("Camila", "Pérez", "CC", "2", "3006008000", "camila.perez@gmail.com", new DateTime(1998, 11, 5),  "Colombia", "Cali"));
                patientRepository.Add(new Patient("John", "Dale", "CE", "3", "170039933", "john.dale@yahoo.com", new DateTime(1990, 1, 30), "Estados Unidos", "Utah"));
            }
            return patientRepository.List();
        }

        public List<int> getPatientsPerDate(string beginDate, string endDate)
        {
            DateTime beginDateParsed = DateTime.Parse(beginDate);
            DateTime endDateParsed = DateTime.Parse(endDate);
            List<Patient> patients = new List<Patient>(patientRepository.List());
            List<Patient> patientsBetweenTwoDates = getPatientsCreatedBetweenTwoDates(patients, beginDateParsed, endDateParsed);
            return getNumberOfPatientsPerMonth(patientsBetweenTwoDates);
        }

        public List<Patient> getPatientsCreatedBetweenTwoDates(List<Patient> patients, DateTime beginDate, DateTime endDate)
        {
            List<Patient> patientsCreatedInTheTwoDates = new List<Patient>();
            patients.ForEach(patient => {
                if (DateUtil.betweenTwoDates(patient.creationDate, beginDate, endDate))
                {
                    patientsCreatedInTheTwoDates.Add(patient);
                }
            });
            return patientsCreatedInTheTwoDates;
        }

        public List<int> getNumberOfPatientsPerMonth(List<Patient> patients)
        {
            List<int> monthsInPatientList = new List<int>(patients.Select(p => p.creationDate.Month));
            List<int> patientsPerMonth = new List<int>();
            Enumerable.Range(0, 12).ToList()
                .ForEach(e => patientsPerMonth
                .Add(monthsInPatientList.Where(m => m == e + 1).Count()));
            return patientsPerMonth;
        }

        public Patient getPatientByDocumentNumber(string documentNumber)
        {
            return patientRepository.GetById(documentNumber);
        }

        public void addPatient(Patient patient)
        {
            patient.creationDate = DateTime.Now;
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
