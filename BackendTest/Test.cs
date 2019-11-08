using Backend.Domain.Entities;
using Backend.Domain.Util;
using Backend.Service;
using System;
using System.Collections.Generic;
using Xunit;

namespace BackendTest
{
    public class Test
    {
        [Fact]
        public void betweenTwoDatesTest()
        {
            DateTime beginDate = DateTime.Parse("2000-11-11");
            DateTime endDate = DateTime.Parse("2002-11-11");
            DateTime date = DateTime.Parse("2001-11-11");
            Assert.True(DateUtil.betweenTwoDates(date, beginDate, endDate));
        }

        [Fact]
        public void getPatientsCreatedBetweenTwoDates()
        {
            DateTime beginDate = DateTime.Parse("2000-11-11");
            DateTime endDate = DateTime.Parse("2002-11-11");

            PatientManager patientManager = new PatientManager();
            Patient p1 = new Patient();
            p1.creationDate = DateTime.Parse("2001-11-11");
            Patient p2 = new Patient();
            p2.creationDate = DateTime.Parse("2003-09-10");
            Patient p3 = new Patient();
            p3.creationDate = DateTime.Parse("2004-04-15");
            Patient p4 = new Patient();
            p4.creationDate = DateTime.Parse("2002-12-12");
            List<Patient> patients = new List<Patient>();
            ListUtil.AddMany(patients, p1, p2, p3, p4);
            int patientsCreatedBetweenTheTwoDates = patientManager.getPatientsCreatedBetweenTwoDates(patients, beginDate, endDate).Count;
            Assert.Equal(1, patientsCreatedBetweenTheTwoDates);
        }

        [Fact]
        public void getPatientsPerMonth()
        {
            PatientManager patientManager = new PatientManager();
            Patient p1 = new Patient();
            p1.creationDate = DateTime.Parse("2001-12-11");
            Patient p2 = new Patient();
            p2.creationDate = DateTime.Parse("2003-12-10");
            Patient p3 = new Patient();
            p3.creationDate = DateTime.Parse("2004-12-15");
            Patient p4 = new Patient();
            p4.creationDate = DateTime.Parse("2002-08-12");
            Patient p5 = new Patient();
            p5.creationDate = DateTime.Parse("2002-08-12");
            List<Patient> patients = new List<Patient>();
            ListUtil.AddMany(patients, p1, p2, p3, p4, p5);
            Assert.Equal(12, patientManager.getPatientsPerMonth(patients).Count);
        }
    }
}
