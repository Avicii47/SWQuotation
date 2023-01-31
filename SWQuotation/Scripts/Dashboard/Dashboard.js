$(document).ready(function () {
    debugger
    getQuotList();
});

function getQuotList() {
    $.ajax({
        type: "POST",
        url: "/Home/GetAllQuot",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: QuotList,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function QuotList(response) {
    var datatableVariable = $("#tblQuot").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": false,
            "deferRender": true,
            paging: true,
            searching: true,
            destroy: true,
            buttons: [
                { extend: 'copyHtml5', footer: true, header: true },
                { extend: 'excelHtml5', footer: true, header: true },
                { extend: 'csvHtml5', footer: true, header: true },
                { extend: 'pdfHtml5', footer: true, header: true }
            ],
            initComplete: function () {
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;

                        $('input', this.header()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            data: response,
            columns: [
                { 'data': 'Status', 'title': 'Status' },
                {
                    'data': null, title: 'Click To Approved', wrap: true, "bAutoWidth": false, width: 80, "render": function (item) {
                        return '<center > <div class="btn-group"><button type="button" data-toggle="modal" onclick="Approved(' + "'" + item.QuotId + "'" + ')" value="0" class="btn btn-success btn-sm" id="btn-sa-confirm"><i class="fa fa-check" aria-hidden="true"></i></button></div >&nbsp;'
                    },
                },
                {
                    'data': null, title: 'Print/View', wrap: true, "bAutoWidth": false, width: 80, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "View(' + "'" + item.QuotId + "'" + ')" value="0" class="btn btn-secondary btn-sm" id="btn-sa-confirm" > <i class="fa fa-eye" aria-hidden="true"></i></button></div></center>&nbsp;'
                    },
                },
                { 'data': 'QuotId', 'title': 'Quotation Id' },
                { 'data': 'CustId', 'title': 'Customer Name' },
                { 'data': 'QuDt', 'title': 'Quotation Date' },
                { 'data': 'Total', 'title': 'Total Amount' },
                { 'data': 'Adv', 'title': 'Advance' },
                { 'data': 'Balance', 'title': 'Balance' },
                {
                    'data': null, title: 'Edit', wrap: true, "bAutoWidth": false, width: 80, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick="CheckForEdit(' + "'" + item.QuotId + "'" + ')" value="0" class="btn btn-secondary btn-sm" id="btn-sa-confirm"><i class="nav-icon fas fa-edit"></i></button></div>&nbsp;'
                    },
                },
                {
                    'data': null, title: 'Delete', wrap: true, "bAutoWidth": false, width: 80, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "CheckForD(' + "'" + item.QuotId + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm"><i class="nav-icon fas fa-trash" aria-hidden="true"></i></button></div></center>&nbsp;'
                    },
                },
            ]
        }
    ).buttons().container().appendTo('#tblQuot_wrapper .col-md-6:eq(0)');
};

var CheckForD = function (QuotId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1ab394',
        cancelButtonColor: '#d9534f',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            CheckForDelete(QuotId);
        }
        getProductList();
    });
};

function Approved(QuotId) {
    $.ajax({
        type: "POST",
        url: "/Customers/Approved",
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Quotation Approved',
                //text: 'Customer Detail Changed'
            });
            getQuotList();
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
};

function Delete(QuotId) {
    $.ajax({
        type: "POST",
        url: "/Customers/DeleteQuot",
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: getQuotList(),
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
};

var CheckForEdit = function (QuotId) {
    debugger
    $.ajax({
        type: "POST",
        url: "/Customers/cheakforedit",
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
            if (response.model == '1') {
                ViewQuot(QuotId);
            } else {
                Edit(QuotId);
            }
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
};

var CheckForDelete = function (QuotId) {
    debugger
    $.ajax({
        type: "POST",
        url: "/Customers/DeleteQuot",
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
            if (response.model == '1') {
                Swal.fire({
                    icon: 'error',
                    title: 'Quotation Has Been Approved '
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Quotation Deleted!'
                });
                Delete(QuotId);
            }
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
};

function View(QuotId) {
    var QId = QuotId;
    window.location.href = "/Customers/Quot?QuotId=" + QuotId;
    $("#QuotId").val(QId);
};

function ViewQuot(QuotId) {
    var QId = QuotId;
    window.location.href = "/Home/ViewQuot?QuotId=" + QuotId;
    $("#QuotId").val(QId);
};

function Edit(QuotId) {
    var QId = QuotId;
    window.location.href = "/Home/EditQuot?EditQuot=" + QuotId;
    $("#QuotId").val(QId);
};

function MovetoQuot() {
    window.location.href = "/Customers/Index" 
};


