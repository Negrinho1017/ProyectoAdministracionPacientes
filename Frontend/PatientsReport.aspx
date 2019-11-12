<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeFile="PatientsReport.aspx.cs" Inherits="PatientsReport" %>

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
    <form>
        <div class="form-group col-md-4">
            <label for="beginDate">Begin date:</label><br />
            <input type="date" class="form-control" id="beginDate" data-bind="value: beginDate" />
        </div>
        <div class="form-group col-md-4">
            <label for="endDate">End date:</label><br />
            <input type="date" class="form-control" id="endDate" data-bind="value: endDate" />
        </div>
        <div class="form-group col-md-4">
            <label for="searchButton"></label>
            <br />
            <button type="button" id="searchButton" class="btn btn-success" data-bind="click: filterPatients">Search</button>
        </div>
    </form>
    <div data-bind="if: patients">
        <div class="demo-container">
            <div id="chart"></div>
        </div>
    </div>

    <div class="modal" id="modalPeoplePerMonth" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">People in <span data-bind="text: month"></span></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <body class="dx-viewport">
                        <div class="demo-container">
                            <div id="gridContainer"></div>
                        </div>
                    </body>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="js/NotificationService.js"></script>
    <script type="text/javascript" src="js/PatientService.js"></script>
    <script type="text/javascript" src="js/PatientReport.js"></script>

</asp:Content>
