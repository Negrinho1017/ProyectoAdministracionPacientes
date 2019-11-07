<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeFile="Patients.aspx.cs" Inherits="Patients" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <head>
        <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/19.2.3/css/dx.common.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/19.2.3/css/dx.light.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/css/select2.min.css" rel="stylesheet" />
        <script src="https://cdn3.devexpress.com/jslib/19.2.3/js/dx.all.js"></script>
        <link rel="stylesheet" type="text/css" href="css/Patient.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

        <script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
    </head>
    <body class="dx-viewport" runat="server">
        <div class="demo-container panel">
            <button class="btn btn-success create" type="button" data-toggle='modal' data-target='#patientForm'>Crear</button>
            <div id="gridContainer"></div>
        </div>
    </body>

    <div id="patientForm" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-bind='click: cancel'>&times;</button>
                    <div data-bind='ifnot: edit'>
                        <h4 class="modal-title">Create patient</h4>
                    </div>
                    <div data-bind='if: edit'>
                        <h4 class="modal-title">Update patient</h4>
                    </div>
                </div>
                <div class="modal-body">
                    <form data-bind='submit: update'>
                        <div class="form-group col-md-12">
                            <label for="name">* Name:</label><br />
                            <input type="text" class="form-control" placeholder="Name" id="name" data-bind='value: patient.name' />
                        </div>
                        <div class="form-group col-md-12">
                            <label for="lastname">* Lastname:</label><br />
                            <input type="text" class="form-control" placeholder="Lastname" id="lastname" data-bind='value: patient.lastname' />
                        </div>       
                        <div class="form-group col-md-12">
                            <label for="documentType">* Document type:</label><br />
                            <select class="form-control" data-bind="options: documentTypes, value: patient.documentType" id="documentType" name="state"></select>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="documentNumber">* Document number:</label><br />
                            <input type="text" class="form-control" placeholder="Document number" id="documentNumber" data-bind='value: patient.documentNumber, disable: edit' />
                        </div>
                        <div class="form-group col-md-12">
                            <label for="phoneNumber">* Phone number:</label><br />
                            <input type="text" class="form-control" placeholder="Phone number" id="phoneNumber" data-bind='value: patient.phoneNumber' />
                        </div>
                        <div class="form-group col-md-12">
                            <label for="email">E-mail:</label><br />
                            <input type="text" class="form-control" placeholder="E-mail" id="email" data-bind='value: patient.email' />
                        </div>
                        <div class="form-group col-md-12">
                            <label for="birthdate">* Birthdate:</label><br />
                            <input type="date" class="form-control" placeholder="Birthdate" id="birthdate" data-bind='value: patient.birthdate' />
                        </div>
                        <div class="form-group col-md-12">
                            <label for="country">Country:</label><br />
                            <select class="form-control" data-bind="options: countries, value: patient.country" id="country" name="state"></select>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="city">City:</label><br />
                            <select class="form-control" data-bind="options: cities, value: patient.city" id="city" name="state"></select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <span data-bind="if: edit">
                        <button type="submit" class="btn btn-success" data-bind='click: updatePatient'>Update</button></span>
                    <span data-bind="ifnot: edit">
                        <button type="submit" class="btn btn-success" data-bind='click: createPatient'>Register</button></span>
                    <button class="btn btn-danger" data-bind='click: cancel'>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="js/NotificationService.js"></script>
    <script type="text/javascript" src="js/countries.js"></script>
    <script type="text/javascript" src="js/PatientService.js"></script>
    <script type="text/javascript" src="js/Patient.js"></script>
</asp:Content>



