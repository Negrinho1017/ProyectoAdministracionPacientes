using Backend.Domain.Entities;
using Backend.Persistence.Builder;
using Backend.Persistence.Entities;
using Backend.Persistence.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Persistence.Repository.Implementation
{
    public class PatientRepository : IPatientRepository<Patient>
    {
        public static List<PatientEntity> patients = new List<PatientEntity>();

        public void Add(Patient entity)
        {
            patients.Add(PatientBuilder.fromDomainToEntity(entity));
        }

        public void Delete(string id)
        {
            PatientEntity patientEntity = patients.Find(p => p.documentNumber == id);
            patients.Remove(patientEntity);
        }

        public void Edit(Patient entity)
        {
            PatientEntity patientDelete = patients.Find(p => p.documentNumber == entity.documentNumber);
            patients.Remove(patientDelete);
            patients.Add(PatientBuilder.fromDomainToEntity(entity));
        }

        public Patient GetById(string id)
        {
            PatientEntity patientEntity = patients.Find(p => p.documentNumber == id);
            return PatientBuilder.fromEntityToDomain(patientEntity);
        }

        public IEnumerable<Patient> List()
        {
            return PatientBuilder.fromListEntityToDomain(patients);
        }
    }
}
