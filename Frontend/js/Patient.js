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


    $(function () {
        getPatients();
    });

    function getPatients() {
        $("#gridContainer").dxDataGrid({
            showBorders: true,
            dataSource: patients,
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
                caption: "Name",
                dataField: "name",
            }, {
                dataField: "documentNumber",
                caption: "Document number",
            }, {
                dataField: "country",
                caption: "Country",
            }, {
                dataField: "documentType",
                caption: "Document type",
            },
            {
                caption: "Acciones",
                cellTemplate: function (container, options) {
                    container.addClass("chart-cell");
                    var documentNumber = options.data.documentNumber;
                    /*text = "<div align='center'>"
                        + "<button type='button' id = '" + cedula + "'class='btn btn-success eliminar' data-bind= 'click: eliminar(" + json + ")'><span class='fas fa-trash-alt' title='eliminar'></span></button>"
                        + "<button type='button' id = '" + cedula + "'class='btn btn-success actualizar' data-toggle='modal' data-target='#formularioPersonas'><span class='fas fa-pencil-alt' title='actualizar'></span></button>"
                        + "</div>";*/
                    text = "<p>Próximamente insertar, eliminar y actualizar</p>"
                    var json = JSON.stringify(options.data);
                    container.append(text);
                }
            }]
        });
    };
}

ko.applyBindings(new KO());