$(document).ready(function () {
    ProdGroup();
    PG();
    getcat();
});


function ProdGroup() {
    let url = "../Product/GrpList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ProdGrp").empty();
                $("#ProdGrp").append($("<option></option>").val("0").html("Select Group"));
                $.each(response, function (data, value) {
                    debugger
                    $("#ProdGrp").append($("<option></option>").val(value.GrpId).html(value.GrpName));
                });
            }
            else {
                $("#ProdGrp").empty();
                $("#ProdGrp").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            return $("#ProdGrp option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function PG() {
    let url = "../Product/GrpList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
            if (response != null) {
                $("#PG").empty();
                $("#PG").append($("<option></option>").val("0").html("Select Group"));
                $.each(response, function (data, value) {
                    debugger
                    $("#PG").append($("<option></option>").val(value.GrpId).html(value.GrpName));
                });
            }
            else {
                $("#PG").empty();
                $("#PG").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            return $("#PG option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function getcat() {
    var GrpId = $('#ProdGrp option:selected').val();
    $.ajax({
        type: "POST",
        url: "../Product/ProdCategory",
        data: '{GrpId:"' + GrpId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: catList,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function catList(response) {
    debugger
    var datatableVariable = $("#tblCate").DataTable(
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
                { 'data': 'CategoryID', 'title': 'Category Id'},
                { 'data': 'CategoryName', 'title': 'Catogory Name' },
                { 'data': 'GrpName', 'title': 'Group Name' },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "Deletecate(' + "'" + item.CategoryID + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="CateDetails(' + "'" + item.CategoryName + "'" + ',' + "'" + item.CategoryID + "'" + ',' + "'" + item.GrpName + "'" +');EditModal();" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ],
            
        }).buttons().container().appendTo('#tblCate_wrapper .col-md-6:eq(0)');
};

function EditModal() {
    $("#Editcate").modal('show');
};

function CateDetails(CategoryName, CategoryID, GrpName) {
    debugger
    $('#Prodgrp1').val(GrpName);
    $('#Prodsub').val(CategoryName);
    $('#Id').val(CategoryID)
}; 

var Deletecate = function (CategoryID) {
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
            Deletecategory(CategoryID);
        }
    });
};

var Deletecategory = function (CategoryID) {
    $.ajax({
        url: "/Product/Deletecate",
        method: "post",
        data: '{CategoryID: "' + CategoryID + '" }',
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
                getcat();

            } else {
                toastr.success('Category Deleted');
                getcat();
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

var addprodcate = function () {
    debugger
    if ($("#ProdGrp").val() == "0") {
        toastr.error('Select Product Group');
        return false;
    }
    else {
        var prodgrp = $("#ProdGrp").val();
    }

    if ($("#catid").val() != "") {
        var catid = $("#catid").val();
    }
    else {
        toastr.error('Select Category Id');
        return false;
    }

    
    if ($("#Txtt_cnam").val() != "") {
        var prodcate = $("#Txtt_cnam").val();
    }
    else {
        toastr.error('Enter Product Category');
        return false;
    }

    var data = {
        Prodgrp:prodgrp,
        Prodcate: prodcate,
        CatID: catid
    };

    $.ajax({
        url: "../Product/AddCate",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            toastr.success('Catogry Added');
            getcat();
            $("#Addcate").modal('hide');
            ProdGroup();
            $("#catid").val("");
            $("#Txtt_cnam").val("");
            
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

var EditCate = function () {
    debugger
    if ($("#Prodsub").val() != "") {
        var cate = $("#Prodsub").val();
    }
    else {
        toastr.error('Select Product Group');
        return false;
    }

    var grp = $('#Id').val();

    var data = {
        Cate: cate,
        Grp: grp,
    };

    $.ajax({
        url: "../Product/EditCate",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            toastr.success('Changes Completed');
            $("#Editcate").modal('hide');
            getcat();
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

function AddCatmodal() {
    $("#Addcate").modal('show');
    var grp = $("#ProdGrp option:selected").text();
    $("#Prodgrp").val(grp);
    var grpid = $("#ProdGrp option:selected").val();
    $("#CId").val(grpid);
};



