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
    this.selectedCountry = ko.observable();
    this.countries = ko.mapping.fromJS(countryArray);
    this.cities = ko.mapping.fromJS([]);
    this.documentTypes = ko.mapping.fromJS(["CC", "CE", "TI"]);
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

    $(".modified-select").select2({
        placeholder: "Select...",
        theme: "bootstrap",
        "language": {
            "noResults": function () {
                return "No records found"
            }
        },
    });

    $("#countryInput").on('input', function () {
        var country = this.value;
        self.getCities(self.findCities(country));
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
        self.restartValues();
        this.edit = ko.mapping.fromJS(false, this.edit);
        this.patient = ko.mapping.fromJS(emptyPatient, this.patient);
        $(`#email`).removeClass("required");
        for (var fieldIndex in fields) {
            field = fields[fieldIndex];
            $(`#${field}`).removeClass("required");
        }
        $('#patientForm').modal('hide');
    }

    this.createPatient = function () {
        if (self.validFields()) {
            const newPatient = JSON.parse(ko.toJSON(this.patient))
            httpPost(newPatient);
            this.patient = ko.mapping.fromJS(emptyPatient, this.patient);
            $('#patientForm').modal('hide');
            successMessage("Patient created!!");
            patients = httpGet();
            getPatients();
            self.restartValues();
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
            self.restartValues();
        } else {
            Swal.fire("You must fill all (*) fields");
        }
    }

    self.findCities = function (country) {
        if (self.findCountryElements(country) !== undefined) {
            console
            return self.findCountryElements(country).states;
        }
        return [];
    }

    self.findCountryElements = function (country) {
        return countryArray.filter(
            function (countryArray) {
                return countryArray.country == country
            }
        )[0];
    }

    self.restartValues = function () {
        this.cities = ko.mapping.fromJS([], this.cities);
        this.countries = ko.mapping.fromJS(countryArray);
    }

    self.assignCity = function (city) {
        this.patient.city(city);
    }

    self.assignCountry = function (country) {
        this.patient.country(country);
    }

    self.assignDocumentType = function (documentType) {
        this.patient.documentType(documentType);
    }

    self.validateEmail = function () {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email = document.getElementById("email").value;
        return email !== "" ? re.test(String(email).toLowerCase()) : true;
    }

    self.validFields = function () {
        var allFieldsFilled = true;
        if (!self.validateEmail()) {
            $(`#email`).addClass("required");
            Swal.fire("You did not write a correct email");
            return false;
        }
        $(`#email`).removeClass("required");
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
        if (!allFieldsFilled) {
            Swal.fire("You must fill all (*) fields");
        }
        return allFieldsFilled;
    }

    self.getCities = function (cities) {
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
        this.patient.documentType(gottenPatient.documentType);

        self.getCities(self.findCities(gottenPatient.country));

        this.patient.country(gottenPatient.country);
        this.patient.city(gottenPatient.city);

        this.patient = ko.mapping.fromJS(gottenPatient, this.patient);
    }

    self.parseDate = function (date) {
        return date.split("T")[0];
    }

    $(function () {
        getPatients();
    });

    function getPatients() {
        patients = patients.map(function (patient) {
            patient.birthdate = self.parseDate(patient.birthdate);
            return patient 
        });

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
                caption: "Birthdate",
                dataField: "birthdate",
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


  