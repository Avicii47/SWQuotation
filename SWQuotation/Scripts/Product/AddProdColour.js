$(document).ready(function () {
    ColourList();
});


function ColourList() {
    let url = "../Product/Colourlist";
    $.ajax({
        type: "POST",
        url: url,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: colrList,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function colrList(response) {
    debugger
    var datatableVariable = $("#tblColour").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": false,
            "deferRender": true,
            paging: true,
            searching: true,
            destroy: true,
            colReorder: {
                realtime: false
            },
            buttons: [
                { extend: 'copyHtml5', footer: true, header: true },
                { extend: 'excelHtml5', footer: true, header: true },
                { extend: 'csvHtml5', footer: true, header: true },
                { extend: 'pdfHtml5', footer: true, header: true }
            ],
            initComplete: function () {
                // Apply the search
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
                {
                    "data": "id", "title": "SNo.",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 'data': 'ColourID', 'title': 'Colur Id' },
                { 'data': 'colour', 'title': 'Colour Name' },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteCol(' + "'" + item.ColourID + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="ColourDetails(' + "'" + item.ColourID + "'" + ',' + "'" + item.colour + "'" + ');EditColourModal();" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ],
            
        }).buttons().container().appendTo('#tblColour_wrapper .col-md-6:eq(0)');
    
};

function AddColomodal() {
    $("#Addcolour").modal('show');
};


function EditColourModal() {
    $("#Editcolour").modal('show');
};

function ColourDetails(ColourID, colour) {
    $('#EditColr').val(colour);
    $('#IdColr').val(ColourID);
};

var EditColor = function () {
    debugger
    if ($("#EditColr").val() != "") {
        var colour = $("#EditColr").val();
    }
    else {
        toastr.error('Select Product Colour');
        return false;
    }

    var colId = $('#IdColr').val();

    var data = {
        ColourID: colId,
        colour: colour,
    };

    $.ajax({
        url: "../Product/EditColor",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            toastr.success('Changes Completed');
            $("#Editcolour").modal('hide');
            ColourList();
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response.model,
            });
        }
    })
}

var DeleteCol = function (ColourID) {
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
            DeleteColour(ColourID);
        }
    });
};

var DeleteColour = function (ColourID) {
    debugger
    $.ajax({
        url: "/Product/DeleteColour",
        method: "post",
        data: '{ColourID: "' + ColourID + '" }',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (model) {
            debugger
            if (model.model == '0') {
                Swal.fire({
                    icon: 'error',
                    title: 'Cannot Delete This Category',
                    text: 'Product Is In Quotation'
                });
                ColourList();

            } else {
                toastr.success('Category Deleted');
                ColourList();
            }
        },
        error: function (model) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: model,
            });
        }
    });
};

var addColour = function () {
    debugger
    if ($("#ColrId").val() != "") {
        var colrid = $("#ColrId").val();
    }
    else {
        toastr.error('Enter Colour Id');
        return false;
    }

    if ($("#Colr").val() != "") {
        var colr = $("#Colr").val();
    }
    else {
        toastr.error('Enter Colour Name');
        return false;
    }

    var data = {
        Colour: colr,
        ColourId: colrid
    };

    $.ajax({
        url: "../Product/AddColour",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            toastr.success('Catogry Added');
            ColourList();
            $("#Addcolour").modal('hide');
            $("#ColrId").val("");
            $("#Colr").val("");
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response.model,
            });
        }
    })
}
