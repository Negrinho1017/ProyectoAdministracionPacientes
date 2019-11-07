using Backend.Domain.Entities;
using Backend.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Persistence.Builder
{
    public static class PatientBuilder
    {
        public static Patient fromEntityToDomain(PatientEntity patientEntity)
        {
            Patient patient = new Patient();
            patient.name = patientEntity.name;
            patient.lastname = patientEntity.lastname;
            patient.birthdate = patientEntity.birthdate;
            patient.city = patientEntity.city;
            patient.country = patientEntity.country;
            patient.documentNumber = patientEntity.documentNumber;
            patient.documentType = patientEntity.documentType;
            patient.email = patientEntity.email;
            patient.phoneNumber = patientEntity.phoneNumber;
            patient.creationDate = patientEntity.creationDate;
            return patient;
        }

        public static PatientEntity fromDomainToEntity(Patient patient)
        {
            PatientEntity patientEntity = new PatientEntity();
            patientEntity.name = patient.name;
            patientEntity.lastname = patient.lastname;
            patientEntity.birthdate = patient.birthdate;
            patientEntity.city = patient.city;
            patientEntity.country = patient.country;
            patientEntity.documentNumber = patient.documentNumber;
            patientEntity.documentType = patient.documentType;
            patientEntity.email = patient.email;
            patientEntity.phoneNumber = patient.phoneNumber;
            patientEntity.creationDate = patient.creationDate;
            return patientEntity;
        }

        public static List<Patient> fromListEntityToDomain(List<PatientEntity> patientsEntity)
        {
            List<Patient> patients = new List<Patient>();
            foreach(PatientEntity patientEntity in patientsEntity)
            {
                patients.Add(fromEntityToDomain(patientEntity));
            }
            return patients;
        }

        public static List<PatientEntity> fromListDomainToEntity(List<Patient> patients)
        {
            List<PatientEntity> patientsEntity = new List<PatientEntity>();
            foreach (Patient patient in patients)
            {
                patientsEntity.Add(fromDomainToEntity(patient));
            }
            return patientsEntity;
        }
    }
}
