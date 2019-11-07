using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Persistence.Entities
{
    public class PatientEntity
    {
        public string name { get; set; }
        public string lastname { get; set; }
        public string documentType { get; set; }
        public string documentNumber { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public DateTime birthdate { get; set; }
        public DateTime creationDate { get; set; }
        public string country { get; set; }
        public string city { get; set; }

        public PatientEntity(string name, string lastname, string documentType, string documentNumber, string phoneNumber, string email, DateTime birthdate, DateTime creationDate, string country, string city)
        {
            this.name = name;
            this.lastname = lastname;
            this.documentType = documentType;
            this.documentNumber = documentNumber;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.birthdate = birthdate;
            this.creationDate = creationDate;
            this.country = country;
            this.city = city;
        }

        public PatientEntity() { }
    }
}
