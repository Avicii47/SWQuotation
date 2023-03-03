$(document).ready(function () {
    getProductList();
    UOM();
    UOM1();
    ProdGroup();
    ProdGroup1();
    FinishList();
    FinishList1();
    ColourList();
    $("#Edit").hide();
});


var saveProduct = function () {
    debugger
    
    if ($("#txtproduct").val() != "") {
        var productname = $("#txtproduct").val();
    }
    else {
        toastr.error('Enter Product Name');
        $("#txtproduct").focus();
        return false;
    }
    if ($("#txtproductID").val() != "") {
        var id = $("#txtproductID").val();
    }
    else {
        toastr.error('Invalid Product ID');
        return false;
    }

    if (myDropzone.files != "") {
        var Photo = myDropzone.files;
        console.log(Photo);
        $formData = new FormData();

        if (Photo.length > 0) {
            for (var i = 0; i < Photo.length; i++) {
                $formData.append("file" + i, Photo[i]);
            }
        }
        for (var pair of $formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }
    else {
        toastr.error('Please Select Product Image');
        return false;
    }

    if ($("#ddlPG option:selected").val() != 0) {
        var prodgrp = $("#ddlPG option:selected").val();
    }
    else {
        toastr.error('Select Product Group');
        $("#ddlPG").focus();
        return false;
    }

    if ($("#ddlPCat option:selected").val() != 0) {
        var productcatogery = $("#ddlPCat option:selected").val();
    }
    else {
        toastr.error('Select Category');
        $("#ddlPCat").focus();
        return false;
    }

    if ($("#ddlPSCat option:selected").val() != 0) {
        var prodscate = $("#ddlPSCat option:selected").val();
    }
    else {
        toastr.error('Select Sub Catogery');
        $("#ddlPSCat").focus();
        return false;
    }

    if ($("#ddlPFinish option:selected").val() != 0) {
        var prodfinish = $("#ddlPFinish option:selected").val();
    }
    else {
        toastr.error('Select Type Of Finish');
        $("#ddlPFinish").focus();
        return false;
    }
    
    if ($("#ddlcolour").val() == "0") {
        toastr.error('Enter Product Colour');
        return false;
    }
    else {
        var productcolour = $("#ddlcolour").val();
    }
    
    if ($("#ddlUOM option:selected").val() != 0) {
        var uom = $("#ddlUOM option:selected").val();
    }
    else {
        toastr.error('Select UOM');
        $("#ddlUOM").focus();
        return false;
    }
    if ($("#txtHt").val() != "") {
        var height = $("#txtHt").val();
    }
    else {
        toastr.error('Enter Height of Product');
        return false;
    }
    if ($("#txtWdt").val() != "") {
        var width = $("#txtWdt").val();
    }
    else {
        toastr.error('Enter Width of Product');
        return false;
    }
    if ($("#txtDpt").val() != "") {
        var depth = $("#txtDpt").val();

    }
    else {
        toastr.error('Enter Depth of Product');
        return false;
    }
    if ($("#txtTh").val() != "") {
        var thickness = $("#txtTh").val();

    }
    else {
        toastr.error('Enter Thickness of Product');
        return false;
    }
    
    if ($("#txtprice").val() != "") {
        var productprice = $("#txtprice").val();
    }
    else {
        toastr.error('Enter Product Price');
        return false;
    }
    $formData.append('ProductName', productname);
    $formData.append('ProductCatogery', productcatogery);
    $formData.append('GrpId', prodgrp);
    $formData.append('SubCateId', prodscate);
    $formData.append('FinishID', prodfinish);
    $formData.append('PC', productcolour);
    $formData.append('ProductPrice', productprice);
    $formData.append('UOM', uom);
    $formData.append('Id', id);
    $formData.append('Height', height);
    $formData.append('Width', width);
    $formData.append('Depth', depth);
    $formData.append('Thickness', thickness);
    
    $.ajax({
        url: "/Product/SaveProduct",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            toastr.success('Product Added Succesfully');
            UOM();
            UOM1();
            clearfunction(); 
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
}

function cheakforId() {
    var id = $("#txtproductID").val();
    $.ajax({
        type: "POST",
        url: "/Product/cheakforId",
        data: '{ id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (model) {
            if (model.model == '0') {
                toastr.error('Product ID already Exist!');
                $("#txtproductID").focus();
                return false;
            } else {
                return true;
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
}

function cheakforId1() {

    var id = $("#ProductId").val();
    $.ajax({
        type: "POST",
        url: "/Product/cheakforId",
        data: '{ id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (model) {

            if (model.model == '0') {
                toastr.error('Product ID already Exist!');
                $("#ProductId").focus();
                return false;
            } else {
                return true;
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
}

var clearfunction = function () {
    getProductList();
    $('#txtproduct').val("");
    $('#txtproductID').val("");
    $('#ddlcatogery').val("0");
    $('#ddlPCat').val("0");
    $('#ddlPSCat').val("0");
    $('#ddlcatogery').val("0");
    $('#ddlPFinish').val("0");
    $('#previews').val("");
    $('#ddlUOM').val("");
    $('#txtHt').val("");
    $('#txtWdt').val("");
    $('#txtDpt').val("");
    $('#txtTh').val("");
    $('#ddlcolour').val("0");
    $('#txtprice').val("");
    $("#addproduct").modal('hide');
    myDropzone.removeAllFiles(true);
}

function getProdPriceList() {
    $.ajax({
        type: "POST",
        url: "/Customers/PricetList",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PriceList,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function PriceList(response) {
    var datatableVariable = $("#tblprodPrice").DataTable(
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
               
                { 'data': 'SID', 'title': 'Product Id', "visible": false },
                { 'data': 'PId', 'title': 'Product Id' },
                { 'data': 'PName', 'title': 'Product Name' },
                { 'data': 't_catm', 'title': 'Product Catogery' },
                { 'data': 'FDate', 'title': 'From Date' },
                { 'data': 'TDate', 'title': 'To Date' },
                { 'data': 'PPrice', 'title': 'Product Price' },
                
            ]
        }).buttons().container().appendTo('#tblprodPrice_wrapper .col-md-6:eq(0)');
};

function getProductList() {
    $.ajax({
        type: "POST",
        url: "/Product/ProductList",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ProductList,
          failure: function (response) {
              alert(response.d);
          },
          error: function (response) {
              alert(response.d);
          }
    });
}

function ProductList(response) {
    var datatableVariable = $("#tblProducts").DataTable(
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
                { 'data': 'ProductId', 'title': 'Product Id'/*, "visible": false*/ },
                { 'data': 'ProductName', 'title': 'Product Name' },
                { 'data': 'GrpName', 'title': 'Product Group' },
                { 'data': 'ProductCatogery', 'title': 'Product Category' },
                { 'data': 'SubCateId', 'title': 'Sub Category' },
                { 'data': 'Finish', 'title': 'Type of Finish' },
                { 'data': 'PC', 'title': 'Product Colour' },
                { 'data': 'UOM', 'title': 'UOM' },
                { 'data': 'Height', 'title': 'Height' },
                { 'data': 'Width', 'title': 'Width' },
                { 'data': 'Depth', 'title': 'Depth' },
                { 'data': 'Thickness', 'title': 'Thickness' },
                { 'data': 'ProductPrice', 'title': 'Product Price' },
                {
                    'data': null, title: 'Product Image', wrap: true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" onclick="ImageDetails(' + "'" + item.ProductId + "'" + ');Modal1()" value="0" class="btn btn-secondary btn-sm" id="btn-sa-confirm"><i class="fas fa-file-image"></i></button></div></center>'
                    },
                },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "Delete0(' + "'" + item.ProductId + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="ProductDetails(' + "'" + item.ProductId + "'" + ');Modal2();" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblProducts_wrapper .col-md-6:eq(0)');
};

var Editdata = function () {
    var pid = $("#ProductId").val()
    if ($("#Txt_Prod").val() != "") {
        var pNmae = document.getElementById("Txt_Prod").value;
    }
    else {
        toastr.error('Enter Product Name');
        return false;
    }

    if ($("#ddlPG1").val() != "") {
        var grp = document.getElementById("ddlPG1").value
    }
    else {
        toastr.error('Select Product Group');
        return false;
    }

    if ($("#ddlPCat1").val() != "") {
        var cat = document.getElementById("ddlPCat1").value;
    }
    else {
        toastr.error('Select Product Category');
        return false;
    }

    if ($("#ddlUOM1").val() != "") {
        var uom = document.getElementById("ddlUOM1").value;
    }
    else {
        toastr.error('Select UOM');
        return false;
    }

    if ($("#Txt_Ht").val() != "") {
        var ht = document.getElementById("Txt_Ht").value;
    }
    else {
        toastr.error('Select Product Height');
        return false;
    }

    if ($("#Txt_Wdt").val() != "") {
        var wdt = document.getElementById("Txt_Wdt").value;
    }
    else {
        toastr.error('Select Product Width');
        return false;
    }

    if ($("#Txt_Dpt").val() != "") {
        var dpt = document.getElementById("Txt_Dpt").value;
    }
    else {
        toastr.error('Select Product Depth');
        return false;
    }

    if ($("#Txt_Th").val() != "") {
        var th = document.getElementById("Txt_Th").value;
    }
    else {
        toastr.error('Select Product Thickness');
        return false;
    }

    if ($("#Txt_Price").val() != "") {
        var price = document.getElementById("Txt_Price").value;
    }
    else {
        toastr.error('Enter Product Price');
        return false;
    }
    if ($("#EditColour").val() != '0') {
        var col = document.getElementById("EditColour").value;
    }
    else {
        toastr.error('Enter Product Colour');
        return false;
    }

    if ($("#ddlProdSubCate").val() !="0" ) {
        var scat = document.getElementById("ddlProdSubCate").value;
    }
    else {
        toastr.error('Select Product Sub-Category');
        return false;
    }
    debugger
    if ($("#ddlPFinish1").val() == "0") {
        toastr.error('Select Product Finish');
        return false;
    }
    else {
        var fin = document.getElementById("ddlPFinish1").value;
    }
    var category = document.getElementById("EditColour").value;

    var model = {
        Pid: pid,
        PName: pNmae,
        Cat: cat,
        UOM: uom,
        Ht: ht,
        Wdt: wdt,
        Dpt: dpt,
        Grp: grp,
        Th: th,
        Price: price,
        Category: category,
        SubCategory: scat,
        Finish: fin,
        Col: col
    };

    $.ajax({
        url: "../Product/Editdata ",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response);
            toastr.success('Changes Completed');
            getProductList();
            $('#modal').modal('toggle');
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

function Modal1() {
    $("#myModal2").modal('show');
};

function Modal2() {
    $("#modal").modal('show');
};

function UOM() {
    let url = "../Product/UOM";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlUOM").empty();
                $("#ddlUOM").append($("<option></option>").val("0").html("Select Unit"));
                $.each(response, function (data, value) {
                    $("#ddlUOM").append($("<option></option>").val(value.UOM).html(value.UOMDesc));
                });
            }
            else {
                $("#ddlUOM").empty();
                $("#ddlUOM").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            return $("#ddlUOM option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function UOM1() {
    let url = "../Product/UOM";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlUOM1").empty();
                $("#ddlUOM1").append($("<option></option>").val("0").html("Select Unit"));
                $.each(response, function (data, value) {
                    $("#ddlUOM1").append($("<option></option>").val(value.UOM).html(value.UOMDesc));
                });
            }
            else {
                $("#ddlUOM1").empty();
                $("#ddlUOM1").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            return $("#ddlUOM1 option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function ImgTable(response) {
    var datatableVariable = $("#tblProdImg").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": true,
            "deferRender": true,
            paging: false,
            searching: false,
            destroy: true,

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
                { 'data': 'Position', 'title': 'Sr No.' },
                { 'data': 'ProductId', 'title': 'Product Id'/*, "visible": false*/ },
                {
                    'title': 'Images',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><a href="/Uploads/' + JsonResultRow.Pic + '" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4"><img src="/Uploads/' + JsonResultRow.Pic + '" style="height:100px;width:100px;"/></center>';
                    }
                },
                { 'data': 'filePath', 'title': 'filePath', "visible": false }, 
            ]
        }).buttons().container().appendTo('#tblProdImg_wrapper .col-md-6:eq(0)');
    
    $("#t_nwbp1").val(response.ProductId);
    $("#postion").val(response.Position);
};

function EditImg(Position) {
    $("#PP").val(Position)
    $("#Edit").modal('show');
};

var Delete0 = function (ProductId) {
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
            DeleteProduct(ProductId);
        }
        getProductList();
    });
};

var DeleteProduct = function (ProductId) {  
    var model = {
        ProductId: ProductId
    };
    $.ajax({
        url: "/Product/DeleteProduct",
        method: "post",
        data: '{ ProductId: "' + ProductId + '" }',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (model) {
            if (model.model == '0') {
                Swal.fire({
                    icon: 'error',
                    title: 'Cannot Delete This Product',
                    text: 'Quotation Is Present In List'
                });
                
            } else {
                toastr.success('Product Deleted');
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

var DeleteI = function (ProductId, Pic, Position) {
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
            DeleteImg(ProductId, Pic, Position);
        }
        getProductList();
    });
};

var DeleteImg = function (ProductId, Pic, Position) {
    debugger
    Position = Pic;
    if (Position == 1) {
        toastr.error('This Photo Cannot Be Deleted');
        return false;
    }
    else {
       
    }
    ProdId = $('#ProductId').val();
    var model = {
        ProductId: ProdId,
        filename: ProductId,
        Position: Position
    };
    $.ajax({
        url: "/Product/DeleteImg",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (model) {
            toastr.success('Image Delete');
            var prod=$("#prod").val();
            Imag(prod);
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

function ProductDetails(ProductId) {
    var model = { ProductId: ProductId };
    let url = "../Product/ProductDetails";
    $.ajax({
        type: "POST",
        url: url,
        data: '{ProductId:"' + ProductId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                debugger
                $("#ProductId").val(response[0].ProductId);
                $("#Txt_Prod").val(response[0].ProductName);
                $("#ddlUOM1").val(response[0].UOM);
                $("#Txt_Ht").val(response[0].Height);
                $("#Txt_Wdt").val(response[0].Width);
                $("#Txt_Dpt").val(response[0].Depth);
                $("#Txt_Th").val(response[0].Thickness);
                var colo = response[0].colour;
                ColourList1(colo);
                //$("#EditColour").val(response[0].colour);
                $("#Txt_Price").val(response[0].ProductPrice);
                $("#ddlPG1").val(response[0].GrpName);
                var cate = response[0].ProductCatogery;
                ProdCategory1(cate);
                $("#ddlPCat1").val(response[0].ProductCatogery);
                var ddl = response[0].ProductCatogery;
                var scat = response[0].SubCateId;
                ProdSubCategory1(ddl, scat);
                $("#ddlProdSubCate").val(response[0].SubCateId);
                $("#ddlPFinish1").val(response[0].Finish);
                Imag();
                return response;
            }
            else {
                return false;
            }
            return response;
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
}

function Imag() {
    var ProductId = $("#ProductId").val();
    let url = "../Product/ProductImage";
    $.ajax({
        type: "POST",
        url: url,
        data: '{ProductId:"' + ProductId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: ImgTbl,
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
}

function ImgTbl(response) {
    debugger
    var datatableVariable = $("#tblPImg").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": true,
            "deferRender": true,
            paging: false,
            "bInfo": false,
            searching: false,
            destroy: true,

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
                    'title': 'Images',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><a href="/Uploads/' + JsonResultRow.Pic + '" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4"><img src="/Uploads/' + JsonResultRow.Pic + '" style="height:100px;width:100px;"/></center>';
                    }
                },
                {
                    'data': null, title: "Delete/Edit", wrap: true, "bAutoWidth": false, "render": function (item) {

                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteI(' + "'" + item.Pic + "'" + ',' + "'" + item.Position + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="EditImg(' + "'" + item.Position + "'" + ')" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblPImg_wrapper .col-md-6:eq(0)');

    $("#t_nwbp1").val(response.ProductId);
    $("#postion").val(response.Position);
};

function ImageDetails(ProductId) {
    
    $("#prod").val(ProductId);
    let url = "../Product/ProductImage";
    $.ajax({
        type: "POST",
        url: url,
        data: '{ProductId:"' + ProductId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success:ImgTable,
            failure: function (response) {
                alert(response.d);
            },
            error: function (response) {
                alert(response.d);
            }
    });
}

var AddImage = function (ProductId) {
    debugger
    ProductId = $('#ProductId').val();
    $formData = new FormData();

    if ($('#Img').val() == "") {
        toastr.error('Please Select Photo');
        document.getElementById('Img').focus();
        return false;
    }
    else {
        var Photo = document.getElementById('Img');
        if (Photo.files.length > 0) {
            for (var i = 0; i < Photo.files.length; i++) {
                $formData.append('file-' + i, Photo.files[i]);
            }
        }
    }
    var productId = ProductId;
    $formData.append('ProductId', productId);

    $.ajax({
        url: "/Product/AddNewImg",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (model) {
            toastr.success('Image Added');
            Imag(ProductId);
            $('#Img').val("");
        },
        error: function (model) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: model,
            });
        }
    });
}

var editImage = function () {
    debugger
    ProductId = $('#ProductId').val();
    Position = $('#PP').val();
    $formData = new FormData();

    if ($('#EditImg').val() == "") {
        toastr.error('Please Select Photo');
        document.getElementById('EditImg').focus();
        return false;
    }
    else {
        var Photo = document.getElementById('EditImg');
        if (Photo.files.length > 0) {
            for (var i = 0; i < Photo.files.length; i++) {
                $formData.append('file-' + i, Photo.files[i]);
            }
        }
    }
    var Position = Position;
    var ProductId = ProductId;
    $formData.append('Position', Position);
    $formData.append('ProductId', ProductId);

    $.ajax({
        url: "/Product/editImage",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (model) {
            
            toastr.success('Image Added');
            Imag(ProductId);
            $('#EditImg').val();
            $("#Edit").modal('hide');
            $("#myModal2").focus();
        },
        error: function (model) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: model,
            });
        }
    });
}

var viewImg = function () {
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        //alert("clicked"); //to test this function ran
        event.preventDefault();
        $(this).ekkoLightbox();
    });
}

function pageRedirect() {
    ProdId = $('#prod').val();
    window.location.href = "/Product/ViewImage?ProdId=" + ProdId;
    $("#ProdId").val(ProdId);
}

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
                $("#ddlPG").empty();
                $("#ddlPG").append($("<option></option>").val("0").html("Select Group"));
                $.each(response, function (data, value) {
                    $("#ddlPG").append($("<option></option>").val(value.GrpId).html(value.GrpName));
                });
            }
            else {
                $("#ddlPG").empty();
                $("#ddlPG").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            return $("#ddlPG option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function ProdCategory() {
    debugger
    var GrpId = $('#ddlPG option:selected').val();
    let url = "../Product/ProdCate";
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

function ProdSubCategory() {
    debugger
    var CategoryID = $('#ddlPCat option:selected').val();
    let url = "../Product/ProdSubCate";
    $.ajax({
        type: "POST",
        url: url,
        data: '{CategoryID:"' + CategoryID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlPSCat").empty();
                $("#ddlPSCat").append($("<option></option>").val("0").html("Select SubCategory"));
                $.each(response, function (data, value) {
                    $("#ddlPSCat").append($("<option></option>").val(value.SubCateId).html(value.SCategory));
                });
            }
            else {
                $("#ddlPSCat").empty();
                $("#ddlPSCat").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            return $("#ddlPSCat option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function FinishList() {
    let url = "../Product/FinishList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlPFinish").empty();
                $("#ddlPFinish").append($("<option></option>").val("0").html("Select Type of Finish"));
                $.each(response, function (data, value) {
                    $("#ddlPFinish").append($("<option></option>").val(value.FinishID).html(value.Finish));
                });
            }
            else {
                $("#ddlPFinish").empty();
                $("#ddlPFinish").append($("<option disabled></option>").val(0).html("Select Type of Finish"));
            }
            return $("#ddlPFinish option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function ProdGroup1() {
    let url = "../Product/GrpList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlPG1").empty();
                $("#ddlPG1").append($("<option></option>").val("0").html("Select Group"));
                $.each(response, function (data, value) {
                    $("#ddlPG1").append($("<option></option>").val(value.GrpId).html(value.GrpName));
                });
            }
            else {
                $("#ddlPG1").empty();
                $("#ddlPG1").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            return $("#ddlPG1 option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function ProdCategory1(cate) {

    var GrpId = $('#ddlPG1 option:selected').val();
    let url = "../Product/ProdCate";
    $.ajax({
        type: "POST",
        url: url,
        data: '{GrpId:"' + GrpId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlPCat1").empty();
                $("#ddlPCa1t").append($("<option></option>").val("0").html("Select Category"));
                $.each(response, function (data, value) {
                    $("#ddlPCat1").append($("<option></option>").val(value.CategoryID).html(value.CategoryName));
                });
            }
            else {
                $("#ddlPCat1").empty();
                $("#ddlPCat1").append($("<option disabled></option>").val(0).html("Select Category"));
            }


            $("#ddlPCat1").val(cate);
            return $("#ddlPCat1 option:selected").text();
            ProdSubCategory1();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function ProdSubCategory1(ddl,scat) {
    if ($('#ddlPCat1 option:selected').val() ==='undefined') {
        var CategoryID = $('#ddlPCat1 option:selected').val();
    }
    else {
        var CategoryID = ddl;
    }
    let url = "../Product/ProdSubCate";
    $.ajax({
        type: "POST",
        url: url,
        data: '{CategoryID:"' + CategoryID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlProdSubCate").empty();
                $("#ddlProdSubCate").append($("<option></option>").val("0").html("Select SubCategory"));
                $.each(response, function (data, value) {
                    $("#ddlProdSubCate").append($("<option></option>").val(value.SubCateId).html(value.SCategory));
                });
            }
            else {
                $("#ddlProdSubCate").empty();
                $("#ddlProdSubCate").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            $("#ddlProdSubCate").val(scat);
            return $("#ddlProdSubCate option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function ProdSubCategory2() {
    var CategoryID = $('#ddlPCat1 option:selected').val();
    let url = "../Product/ProdSubCategory";
    $.ajax({
        type: "POST",
        url: url,
        data: '{CategoryID:"' + CategoryID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlProdSubCate").empty();
                $("#ddlProdSubCate").append($("<option></option>").val("0").html("Select SubCategory"));
                $.each(response, function (data, value) {
                    $("#ddlProdSubCate").append($("<option></option>").val(value.SubCateId).html(value.SCategory));
                });
            }
            else {
                $("#ddlProdSubCate").empty();
                $("#ddlProdSubCate").append($("<option disabled></option>").val(0).html("Select Unit"));
            }
            //$("#ddlProdSubCate").val(scat);
            return $("#ddlProdSubCate option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function FinishList1() {
    let url = "../Product/FinishList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlPFinish1").empty();
                $("#ddlPFinish1").append($("<option></option>").val("0").html("Select Type of Finish"));
                $.each(response, function (data, value) {
                    $("#ddlPFinish1").append($("<option></option>").val(value.FinishID).html(value.Finish));
                });
            }
            else {
                $("#ddlPFinish1").empty();
                $("#ddlPFinish1").append($("<option disabled></option>").val(0).html("Select Type of Finish"));
            }
            return $("#ddlPFinish1 option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

//add=ddlcolour
//edit=EditColour


function ColourList() {
    let url = "../Product/ColourList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlcolour").empty();
                $("#ddlcolour").append($("<option></option>").val("0").html("Select Colour"));
                $.each(response, function (data, value) {
                    $("#ddlcolour").append($("<option></option>").val(value.ColourID).html(value.colour));
                });
            }
            else {
                $("#ddlcolour").empty();
                $("#ddlcolour").append($("<option disabled></option>").val(0).html("Select Colour"));
            }
            return $("#ddlcolour option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function ColourList1(colo) {
    debugger
    let url = "../Product/ColourList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
            if (response != null) {
                $("#EditColour").empty();
                $("#EditColour").append($("<option></option>").val("0").html("Select Colour"));
                $.each(response, function (data, value) {
                    $("#EditColour").append($("<option></option>").val(value.ColourID).html(value.colour));
                });
            }
            else {
                $("#EditColour").empty();
                $("#EditColour").append($("<option disabled></option>").val(0).html("Select Colour"));
            }

            if (colo == "" || colo == "0") {
           
                return $("#EditColour option:selected").text();
            }
            else {
                return $("#EditColour").val(colo);
            }
            
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}
