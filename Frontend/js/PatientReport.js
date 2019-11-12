var peoplePerMonth = [];
var KO = function () {
    self = this;
    self.patients = ko.mapping.fromJS(false);
    self.beginDate = ko.observable("");
    self.endDate = ko.observable("");
    self.month = ko.observable("");

    self.invalidDate = function (date) {
        return date === "";
    }

    self.filterPatients = function () {
        self.patients = ko.mapping.fromJS(true, self.patients);
        beginDate = ko.toJS(self.beginDate);
        endDate = ko.toJS(self.endDate);
        if (self.invalidDate(beginDate) || self.invalidDate(endDate)) {
            Swal.fire("You must fill the date fields");
            return;
        }
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

    function getPatientsPerMonth(index) {
        $("#gridContainer").dxDataGrid({
            dataSource: people[index],
            filterRow: {
                visible: true
            },
            paging: {
                pageSize: 2
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [2, 4, 6]
            },
            columns: [
                {
                    caption: "Name",
                    dataField: "name",
                }, {
                    dataField: "lastname",
                    caption: "Lastname",
                }, {
                    dataField: "phoneNumber",
                    caption: "Phone number",
                }, {
                    dataField: "email",
                    caption: "Email",
                }
            ],
            showBorders: true
        });
    }

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
                getPatientsPerMonth(index);
                $('#modalPeoplePerMonth').modal('show');
            },
            tooltip: {
                enabled: true
            },
            title: `Patients registered between ${ko.toJS(self.beginDate)} and ${ko.toJS(self.endDate)}`
        });
    }
}

ko.applyBindings(new KO());