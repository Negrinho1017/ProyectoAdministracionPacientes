var peoplePerMonth = [];
var KO = function () {
    self = this;
    self.patients = ko.mapping.fromJS(false);
    self.beginDate = ko.observable("");
    self.endDate = ko.observable("");
    self.month = ko.observable("");
    self.filterPatients = function () {
        self.patients = ko.mapping.fromJS(true, self.patients);
        beginDate = ko.toJS(self.beginDate);
        endDate = ko.toJS(self.endDate);
        people = httpGetPatientsPerMonth(beginDate, endDate);
        peoplePerMonth = [{
            arg: "January",
            val: people[0].length
        }, {
            arg: "February",
            val: people[1].length
        }, {
            arg: "March",
            val: people[2].length
        }, {
            arg: "April",
            val: people[3].length
        }, {
            arg: "May",
            val: people[4].length
        }, {
            arg: "June",
            val: people[5].length
        }, {
            arg: "July",
            val: people[6].length
        }, {
            arg: "August",
            val: people[7].length
        }, {
            arg: "September",
            val: people[8].length
        }, {
            arg: "October",
            val: people[9].length
        }, {
            arg: "November",
            val: people[10].length
        }, {
            arg: "December",
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
                type: "bar",
                color: "#49DF62",
            },
            argumentAxis: {
                tickInterval: 10,
                label: {
                    format: {
                        type: "decimal"
                    }
                }
            },
            onPointClick: function (e) {
                index = e.target.index;
                self.month(e.target.argument);
                $(function () {
                    $("#gridContainer").dxDataGrid({
                        dataSource: people[index],
                        columns: ["name", "lastname", "phoneNumber", "email"],
                        showBorders: true
                    });
                });
                $('#modalPeoplePerMonth').modal('show');
            },
            tooltip: {
                enabled: true
            },
            title: "Patients registered"
        });
    }
}


ko.applyBindings(new KO());