﻿var patients = httpGet();
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

    $(".modified-select").select2({
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
                caption: "Birthdate",
                cellTemplate: function (container, options) {
                    container.addClass("chart-cell");
                    var birthdate = self.parseDate(options.data.birthdate);
                    container.append(birthdate);
                }
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