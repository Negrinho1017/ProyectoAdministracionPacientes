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

var KO = function () {
    console.log(httpGet());
    this.countries = ko.mapping.fromJS(country_arr);
    this.cities = ko.mapping.fromJS([]);
    this.documentTypes = ko.mapping.fromJS(["CC", "CE", "TI"]);
    this.patient = ko.mapping.fromJS(emptyPatient);
    this.edit = ko.mapping.fromJS(false);
    this.countrySelected = ko.mapping.fromJS(false);
    var self = this

    $("#gridContainer").on("click", ".delete", function () {
        var id = $(this).attr("id");
        self.delete(id);
    });

    $("#gridContainer").on("click", ".update", function () {
        var id = $(this).attr("id");
        self.getPatient(id);
    });

    $("select").select2({
        placeholder: "Select...",
        theme: "bootstrap",
        "language": {
            "noResults": function () {
                return "No records found"
            }
        },
    });

    $('#country').change(function () {
        var citiesIndex = (country_arr.indexOf(($(this).val())));
        self.getCities(s_a[citiesIndex + 1].split("|"), citiesIndex);
    });

    $('#city').change(function () {
        var city = $(this).val();
        self.assignCity(city);
    });

    $('#documentType').change(function () {
        var documentType = $(this).val();
        self.assignDocumentType(documentType);
    });

    this.cancel = function () {
        this.edit = ko.mapping.fromJS(false, this.edit);
        this.patient = ko.mapping.fromJS(emptyPatient, this.patient);
        for (var fieldIndex in fields) {
            field = fields[fieldIndex];
            $(`#${field}`).removeClass("required");
        }
        $('#patientForm').modal('hide');
    }

    this.createPatient = function () {
        console.log(ko.toJSON(this.patient.country));
        if (self.validFields()) {
            const newPatient = JSON.parse(ko.toJSON(this.patient))
            httpPost(newPatient);
            this.patient = ko.mapping.fromJS(emptyPatient, this.patient);
            $('#patientForm').modal('hide');
            successMessage("Patient created!!");
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
            successMessage("Patient updated!!");
            patients = httpGet();
            getPatients();
            this.edit = ko.mapping.fromJS(false, this.edit);
            this.patient = ko.mapping.fromJS(emptyPatient, this.patient);
            $('#patientForm').modal('hide');
        } else {
            Swal.fire("You must fill all (*) fields");
        }
    }

    self.assignCity = function (city) {
        this.patient.city = city;
    }

    self.assignDocumentType = function (documentType) {
        this.patient.documentType = documentType;
    }

    self.validFields = function () {
        var allFieldsFilled = true;
        for (var fieldIndex in fields) {
            field = fields[fieldIndex];
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

    self.getCities = function (cities, country) {
        this.patient.country = country_arr[country];
        this.countrySelected = ko.mapping.fromJS(true, this.countrySelected);
        this.cities = ko.mapping.fromJS(cities, this.cities);
    }

    self.delete = function (data) {
        acceptCancelMessage("You won't be able to revert the changes!")
        .then((result) => {
            if (result.value) {
                httpDelete(data);
                patients = httpGet();
                getPatients();
                successMessage('Patient deleted');
            }
        });
    }

    self.getPatient = function (documentNumber) {
        this.edit = ko.mapping.fromJS(true, this.edit);
        this.documentNumber = httpGetById(documentNumber).documentNumber;
        gottenPatient = httpGetById(documentNumber);
        gottenPatient.birthdate = self.parseDate(gottenPatient.birthdate);
        this.patient = ko.mapping.fromJS(gottenPatient, this.patient);
    }

    self.parseDate = function (date) {
        return date.split("T")[0];
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