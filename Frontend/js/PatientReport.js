var peoplePerMonth = [];
var KO = function () {
    self = this;
    self.patients = ko.mapping.fromJS(false);
    self.beginDate = ko.observable("");
    self.endDate = ko.observable("");

    self.filterPatients = function () {
        self.patients = ko.mapping.fromJS(true, self.patients);
        beginDate = ko.toJS(self.beginDate);
        endDate = ko.toJS(self.endDate);
        people = httpGetPatientsPerMonth(beginDate, endDate);
        console.log(people);
        peoplePerMonth = [{
            arg: "Enero",
            val: people[0].length
        }, {
            arg: "Febrero",
            val: people[1].length
        }, {
            arg: "Marzo",
            val: people[2].length
        }, {
            arg: "Abril",
            val: people[3].length
        }, {
            arg: "Mayo",
            val: people[4].length
        }, {
            arg: "Junio",
            val: people[5].length
        }, {
            arg: "Julio",
            val: people[6].length
        }, {
            arg: "Agosto",
            val: people[7].length
        }, {
            arg: "Septiembre",
            val: people[8].length
        }, {
            arg: "Octubre",
            val: people[9].length
        }, {
            arg: "Noviembre",
            val: people[10].length
        }, {
            arg: "Diciembre",
            val: people[11].length
        }];
        getGraph();
    }

    $(function () {
        getGraph();
    });

    function getGraph() {
        $("#chart").dxChart({
            dataSource: peoplePerMonth,
            legend: {
                visible: false
            },
            series: {
                type: "bar"
            },
            argumentAxis: {
                tickInterval: 10,
                label: {
                    format: {
                        type: "decimal"
                    }
                }
            },
            tooltip: {
                enabled: true
            },
            title: "Patients registered"
        });
    }
}


ko.applyBindings(new KO());