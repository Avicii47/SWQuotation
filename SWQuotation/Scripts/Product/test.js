$(document).ready(function () {
    getProductList();
    UOM();
    UOM1();
    ProductCategory();
    Catogery1();
});

var saveProduct = function () {
    debugger
    //if (myDropzone.files != "") {
    //    return true;
    //}
    //else {
    //    toastr.error('Please Select Product Image');
    //    return false;
    //}
    //if ($("#txtproduct").val() != "") {
    //    var productname = $("#txtproduct").val();
    //}
    //else {
    //    toastr.error('Enter Product Name');
    //    return false;
    //}
    //if ($("#ddlCatogery option:selected").html() =="Select Category") {
    //    toastr.error('Enter Category');
    //    return false;
    //}
    //else {
    //    var productcatogery = $("#ddlCatogery option:selected").html();
    //}
    //if ($("#txtcolour").val() != "") {
    //    var productcolour = $("#txtcolour").val();
    //}
    //else {
    //    toastr.error('Enter Product Colour');
    //    return false;
    //}
    //if ($("#txtprice").val() != "") {
    //    var productprice = $("#txtprice").val();
    //}
    //else {
    //    toastr.error('Enter Product Price');
    //    return false;
    //}
    //if ($("#ddlUOM option:selected").val() == "Select Unit") {
    //    toastr.error('Enter Product Price');
    //    return false;
    //}
    //else {
    //    var uom = $("#ddlUOM option:selected").val();

    //}
    //if ($("#txtHt").val() != "") {
    //    var height = $("#txtHt").val();

    //}
    //else {
    //    toastr.error('Enter height of Product');
    //    return false;
    //}
    //if ($("#txtWdt").val() != "") {
    //    var width = $("#txtWdt").val();

    //}
    //else {
    //    toastr.error('Enter Width of Product');
    //    return false;
    //}
    //if ($("#txtDpt").val() != "") {
    //    var depth = $("#txtDpt").val();

    //}
    //else {
    //    toastr.error('Enter Width of Product');
    //    return false;
    //}
    //if ($("#txtTh").val() != "") {
    //    var thickness = $("#txtTh").val();

    //}
    //else {
    //    toastr.error('Enter thickness of Product');
    //    return false;
    //}

    var Photo = myDropzone.files;
    console.log(Photo);
    var message = "";
    $formData = new FormData();

    if (Photo.length > 0) {
        for (var i = 0; i < Photo.length; i++) {
            $formData.append("file" + i, Photo[i]);
        }
    }
    for (var pair of $formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }


    var productname = $("#txtproduct").val();
    var productcatogery = $("#ddlCatogery option:selected").html();
    var productcolour = $("#txtcolour").val();
    var productprice = $("#txtprice").val();
    var uom = $("#ddlUOM option:selected").val();
    var height = $("#txtHt").val();
    var width = $("#txtWdt").val();
    var depth = $("#txtDpt").val();
    var thickness = $("#txtTh").val();

    $formData.append('ProductName', productname);
    $formData.append('ProductCatogery', productcatogery);
    $formData.append('PC', productcolour);
    $formData.append('ProductPrice', productprice);
    $formData.append('UOM', uom);
    $formData.append('Height', height);
    $formData.append('Width', width);
    $formData.append('Depth', depth);
    $formData.append('Thickness', thickness);
    debugger
    $.ajax({
        url: "/Product/SaveProduct",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function () {
            debugger
            //{
            //    Swal.fire(
            //        'Product Added!',
            //        'Product Added!',
            //        'success'
            //    )
            //}
            //clearfunction();

            //getProductList();  
        }
    });
}

var clearfunction = function () {
    debugger
    getProductList();
    $('#txtproduct').val("");
    $('#ddlcatogery').val("");
    $('#previews').val("");
    $('#ddlUOM').val("");
    $('#txtHt').val("");
    $('#txtWdt').val("");
    $('#txtDpt').val("");
    $('#txtTh').val("");
    $('#txtcolour').val("");
    $('#txtprice').val("");
    myDropzone.removeAllFiles(true);

}

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
                { 'data': 'ProductCatogery', 'title': 'Product Catogery' },
                { 'data': 'ProductPrice', 'title': 'Product Price' },
                {
                    'data': null, title: 'Product Image', wrap: true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" onclick="ImageDetails(' + "'" + item.ProductId + "'" + ');Modal1()" value="0" class="btn btn-warning btn-sm" id="btn-sa-confirm"><i class="fas fa-file-image"></i></button></div></center>'
                    },
                },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "Delete(' + "'" + item.ProductId + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="ProductDetails(' + "'" + item.ProductId + "'" + ');Modal2()" class="btn btn-warning btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblProducts_wrapper .col-md-6:eq(0)');
};

var Editdata = function (ProductId) {
    var pid = $("#ProductId").val()
    var pNmae = document.getElementById("Txt_Prod").value;
    var cat = document.getElementById("ddlCatogery1").value;
    var uom = document.getElementById("ddlUOM1").value;
    var ht = document.getElementById("Txt_Ht").value;
    var wdt = document.getElementById("Txt_Wdt").value;
    var dpt = document.getElementById("Txt_Dpt").value;
    var th = document.getElementById("Txt_Th").value;
    var price = document.getElementById("Txt_Price").value;
    var col = document.getElementById("Txt_PCol").value;

    var model = {
        Pid: pid,
        PName: pNmae,
        Cat: cat,
        UOM: uom,
        Ht: ht,
        Wdt: wdt,
        Dpt: dpt,
        Th: th,
        Price: price,
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
            Swal.fire({
                icon: 'success',
                title: 'Changes Completed',
                text: 'Product Detail Changed'
            });
            getProductList();
        }
    });
};

function Modal1() {
    $("#myModal2").modal('show');
};

function Modal2() {
    $("#modal").modal('show');
};

function ProductCategory() {
    let url = "../Product/GetCategory";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlCatogery").empty();
                $("#ddlCatogery").append($("<option></option>").val("0").html("Select Category"));
                $.each(response, function (data, value) {
                    $("#ddlCatogery").append($("<option></option>").val(value.Category).html(value.Category));
                });
            }
            else {
                $("#ddlCatogery").empty();
                $("#ddlCatogery").append($("<option disabled></option>").val(0).html("Select Category"));
            }
            return $("#ddlCatogery option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function Catogery1() {

    let url = "../Product/GetCategory";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#cat").empty();
                $("#cat").append($("<option></option>").val("0").html("Select Category"));
                $.each(response, function (data, value) {
                    $("#cat").append($("<option></option>").val(value.Category).html(value.Category));
                });
            }
            else {
                $("#cat").empty();
                $("#cat").append($("<option disabled></option>").val(0).html("Select Category"));
            }
            return $("#cat option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

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
                    $("#ddlUOM").append($("<option></option>").val(value.UOM).html(value.UOM));
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
                    $("#ddlUOM1").append($("<option></option>").val(value.UOM).html(value.UOM));
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
                { 'data': 'Position', 'title': 'Position' },
                { 'data': 'ProductId', 'title': 'Product Id'/*, "visible": false*/ },
                {
                    'title': 'Product Image',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><a href="/Uploads/' + JsonResultRow.Pic + '" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4"><img src="/Uploads/' + JsonResultRow.Pic + '" style="height:100px;width:100px;"/></center>';
                    }
                },
                { 'data': 'filePath', 'title': 'filePath', "visible": false },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteImg(' + "'" + item.Pic + "'" + ',' + "'" + item.Position + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div></center>&nbsp;'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblProdImg_wrapper .col-md-6:eq(0)');
    debugger
    $("#t_nwbp1").val(response.ProductId);
    $("#postion").val(response.Position);
};

var Delete = function (ProductId) {
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
                Swal.fire(
                    'Deleted!',
                    'Product Deleted!',
                    'success'
                )
            }
        }
    });
};

var DeleteImg = function (ProductId, Pic, Position) {

    Position = Pic;
    ProdId = $('#prod').val();

    //Position = $("#Txt_Prod").html('Position:selected');
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
        success: function (response) {
            Swal.fire(
                'Deleted!',
                'Image Deleted!',
                'success'
            );

            var prod = $("#prod").val();
            ImageDetails(prod);
        }
    });
};

function ProductDetails(ProductId) {
    debugger
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
            debugger
            if (response != null) {
                $("#ProductId").val(response[0].ProductId);
                $("#Txt_Prod").val(response[0].ProductName);
                $("#cat").val(response[0].ProductCatogery);
                $("#ddlUOM1").val(response[0].UOM);
                $("#Txt_Ht").val(response[0].Height);
                $("#Txt_Wdt").val(response[0].Width);
                $("#Txt_Dpt").val(response[0].Depth);
                $("#Txt_Th").val(response[0].Thickness);
                $("#Txt_PCol").val(response[0].colour);
                $("#Txt_Price").val(response[0].ProductPrice);

                return response;

            }
            else {
                return false;
            }
            return response;
        },
    });
}

function ImageDetails(ProductId) {
    debugger
    $("#prod").val(ProductId);
    let url = "../Product/ProductImage";
    $.ajax({
        type: "POST",
        url: url,
        data: '{ProductId:"' + ProductId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success:
            ImgTable,
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
    ProductId = $('#prod').val();
    var message = "";
    $formData = new FormData();

    var Photo = document.getElementById('Img');
    if (Photo.files.length > 0) {
        for (var i = 0; i < Photo.files.length; i++) {
            $formData.append('file-' + i, Photo.files[i]);
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
        success: function (response) {
            alert("Success");
            ImageDetails(ProductId);

            $('#Img').val("");
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