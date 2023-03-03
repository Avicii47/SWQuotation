$(document).ready(function () {
    ProdGroup();
    PG();
    ProdSubCategory();
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

function ProdSubCategory() {
    var CategoryID = $('#ddlPCat option:selected').val();
    let url = "../Product/ProdSubCategory";
    $.ajax({
        type: "POST",
        url: url,
        data: '{CategoryID:"' + CategoryID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SubcatList,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function SubcatList(response) {
    debugger
    var datatableVariable = $("#tblSubCate").DataTable(
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
                { 'data': 'SubCateId', 'title': 'SubCategory Id' },
                { 'data': 'SCategory', 'title': 'SubCatogory Name' },
                { 'data': 'CategoryID', 'title': 'Catogory Id' },
                { 'data': 'CategoryName', 'title': 'Catogory Name' },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteSub(' + "'" + item.SubCateId + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="SubDetails(' + "'" + item.SubCateId + "'" + ',' + "'" + item.SCategory + "'" + ',' + "'" + item.CategoryID + "'" + ',' + "'" + item.CategoryName + "'" + ');EditSubModal();" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblSubCate_wrapper .col-md-6:eq(0)');
};

function EditSubModal() {
    $("#EditSubcate").modal('show');
};

function SubDetails(SubCateId, SCategory, CategoryID, CategoryName) {
    debugger
    $('#CId').val(CategoryID);
    $('#Cname').val(CategoryName);
    //$('#Procate').val(SubCateId);
    $('#Procate').val(SubCateId);
    $('#Prosub1').val(SCategory);
};

var DeleteSub = function (SubCateId) {
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
            DeleteSubCate(SubCateId);
        }
    });
};

var DeleteSubCate = function (SubCateId) {
    $.ajax({
        url: "/Product/DeleteSubcate",
        method: "post",
        data: '{CategoryID: "' + SubCateId + '" }',
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
                ProdSubCategory();

            } else {
                toastr.success('SubCategory Deleted');
                ProdSubCategory();
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

var addprodsubcate = function () {
    debugger
    
    if ($("#PG").val() == "0") {
        toastr.error('Select Product Catogry');
        return false;
    }
    else {
        var pro = $("#PG").val();
    }


    if ($("#ddlPCat").val() == null || $("#ddlPCat").val() == "0") {
        
        toastr.error('Select Product Catogry');
        return false;
    }
    else {
        var prodgrp = $("#ddlPCat").val();
    }

    if ($("#Prosub").val() != "") {
        var prodcate = $("#Prosub").val();
    }
    else {
        toastr.error('Enter Product SubCategory');
        return false;
    }

    if ($("#SubId").val() != "") {
        var subId = $("#SubId").val();
    }
    else {
        toastr.error('Enter SubCategory ID');
        return false;
    }

    var data = {
        Prodgrp: prodgrp,
        Prodcate: prodcate,
        SubId: subId,
    };


    $.ajax({
        url: "../Product/AddSubCate",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            toastr.success('SubCatogry Added');
            ProdSubCategory();
            $("#AddSubcate").modal('hide');
            PG();
            $("#ProdCat").val("0");
            $("#SubId").val("");
            $("#Prosub").val("");
            
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


var EditSub = function () {
    debugger
    if ($("#Prosub1").val() != "") {
        var Prosub = $("#Prosub1").val();
    }
    else {
        toastr.error('Select Product Group');
        return false;
    }
    
    var id = $("#Procate").val();


    var data = {
        Cate: Prosub,
        Grp: id,
    };

    $.ajax({
        url: "../Product/EditSubCate",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            toastr.success('Changes Completed');
            $("#EditSubcate").modal('hide');
            ProdSubCategory();
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


function AddSubCatmodal() {
    $("#AddSubcate").modal('show');
    var grp = $("#PG option:selected").text();
    $("#Prodgrp0").val(grp);
    var grpid = $("#ddlPCat option:selected").val();
    $("#CId0").val(grpid);
    var sub = $("#ddlPCat option:selected").text();
    $("#Prodcat0").val(sub);
};

function ProdCat() {
    debugger
    var GrpId = $('#PG option:selected').val();
    let url = "../Product/ProdCategory";
    $.ajax({
        type: "POST",
        url: url,
        data: '{GrpId:"' + GrpId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlPCat").empty();
                $("#ddlPCat").append($("<option></option>").val("0").html("Select Category"));
                $.each(response, function (data, value) {
                    $("#ddlPCat").append($("<option></option>").val(value.CategoryID).html(value.CategoryName));
                });
            }
            else {
                $("#ddlPCat").empty();
                $("#ddlPCat").append($("<option disabled></option>").val(0).html("Select Category"));
            }
            return $("#ddlPCat option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}