var patients = httpGet();
var emptyPatient = {
    "name": "",
    "lastname": "",
    "documentType": "",
    "documentNumber": "",
    "phoneNumber": "",
    "email": "",
    "birthdate": "",
    "country": "",
    "city": ""
}

var fields = ["name", "lastname", "documentType", "documentNumber", "phoneNumber", "birthdate"];

$(document).on('click', '.cancel', function () {
    for (var fieldIndex in fields) {
        field = fields[fieldIndex];
        $(`#${field}`).removeClass("required");
    }
});

var KO = function () {
    this.patient = ko.mapping.fromJS(emptyPatient);
    this.edit = ko.mapping.fromJS(false);
    var self = this

    $("#gridContainer").on("click", ".delete", function () {
        var id = $(this).attr("id");
        self.delete(id);
    });

    $("#gridContainer").on("click", ".update", function () {
        var id = $(this).attr("id");
        self.getPatient(id);
    });

    this.createPatient = function () {
        if (self.validFields()) {
            const newPatient = JSON.parse(ko.toJSON(this.patient))
            httpPost(newPatient);
            this.patient = ko.mapping.fromJS(emptyPatient, this.patient);
            $('#patientForm').modal('hide');
            patients = httpGet();
            getPatients();
        } else {
            Swal.fire("You must fill all (*) fields");
        }
    }

    this.updatePatient = function () {       
        if (self.validFields()) {
            const updatedPatient = JSON.parse(ko.toJSON(this.patient));
            httpPut(this.documentNumber, updatedPatient);
            patients = httpGet();
            getPatients();
            this.edit = ko.mapping.fromJS(false, this.edit);
            this.patient = ko.mapping.fromJS(emptyPatient, this.patient);
            $('#patientForm').modal('hide');
        } else {
            Swal.fire("You must fill all (*) fields");
        }
    }

    self.validFields = function () {
        var allFieldsFilled = true;
        for (var fieldIndex in fields) {
            field = fields[fieldIndex]
            element = document.getElementById(fields[fieldIndex]).value;
            if (element === "") {
                $(`#${field}`).addClass("required");
                allFieldsFilled = false;
            } else {
                $(`#${field}`).removeClass("required");
            }
        }
        return allFieldsFilled;
    }

    self.delete = function (data) {
        httpDelete(data);
        patients = httpGet();
        getPatients();
    }

    self.getPatient = function (documentNumber) {
        this.edit = ko.mapping.fromJS(true, this.edit);
        this.documentNumber = httpGetById(documentNumber).documentNumber;
        this.patient = ko.mapping.fromJS(httpGetById(documentNumber), this.patient);
    }

    $(function () {
        getPatients();
    });

    function getPatients() {
        $("#gridContainer").dxDataGrid({
            showBorders: true,
            dataSource: patients,
            columnWidth: 150,
            scrolling: {
                columnRenderingMode: "virtual"
            },
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
            columns: [{
                caption: "Acciones",
                cellTemplate: function (container, options) {
                    container.addClass("chart-cell");
                    var documentNumber = options.data.documentNumber;
                    text = "<div align='center'>"
                        + "<button type='button' id = '" + documentNumber + "'class='btn btn-success delete'><span class='fas fa-trash-alt' title='delete'></span></button>"
                        + "<button type='button' id = '" + documentNumber + "'class='btn btn-success update' data-toggle='modal' data-target='#patientForm'><span class='fas fa-pencil-alt' title='update'></span></button>"
                        + "</div>";
                    var json = JSON.stringify(options.data);
                    container.append(text);
                }
            },
            {
                caption: "Name",
                dataField: "name",
            }, {
                dataField: "lastname",
                caption: "Lastname",
            }, {
                dataField: "documentType",
                caption: "Document type",
            }, {
                dataField: "documentNumber",
                caption: "Document number",
            },
            {
                dataField: "phoneNumber",
                caption: "Phone number",
            },
            {
                dataField: "email",
                caption: "E-mail",
            },
            {
                dataField: "birthdate",
                caption: "Birthdate",
            },
            {
                dataField: "country",
                caption: "Country",
            },
            {
                dataField: "city",
                caption: "City",
            }]
        });
    };
}

ko.applyBindings(new KO());