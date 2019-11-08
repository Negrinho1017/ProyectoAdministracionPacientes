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
        peoplePerMonth = [{
            arg: "Enero",
            val: httpGetPatientsPerMonth(beginDate, endDate)[0]
        }, {
            arg: "Febrero",
            val: httpGetPatientsPerMonth(beginDate, endDate)[1]
        }, {
            arg: "Marzo",
            val: httpGetPatientsPerMonth(beginDate, endDate)[2]
        }, {
            arg: "Abril",
            val: httpGetPatientsPerMonth(beginDate, endDate)[3]
        }, {
            arg: "Mayo",
            val: httpGetPatientsPerMonth(beginDate, endDate)[4]
        }, {
            arg: "Junio",
            val: httpGetPatientsPerMonth(beginDate, endDate)[5]
        }, {
            arg: "Julio",
            val: httpGetPatientsPerMonth(beginDate, endDate)[6]
        }, {
            arg: "Agosto",
            val: httpGetPatientsPerMonth(beginDate, endDate)[7]
        }, {
            arg: "Septiembre",
            val: httpGetPatientsPerMonth(beginDate, endDate)[8]
        }, {
            arg: "Octubre",
            val: httpGetPatientsPerMonth(beginDate, endDate)[9]
        }, {
            arg: "Noviembre",
            val: httpGetPatientsPerMonth(beginDate, endDate)[10]
        }, {
            arg: "Diciembre",
            val: httpGetPatientsPerMonth(beginDate, endDate)[11]
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