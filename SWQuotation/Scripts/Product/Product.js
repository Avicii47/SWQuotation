$(document).ready(function () {
    getProductList();
    UOM();
    UOM1();
/*    ProductCategory();*/
    Catogery1();
    $("#Edit").hide();
});

var saveProduct = function () {
    debugger
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
    if ($("#txtproduct").val() != "") {
        var productname = $("#txtproduct").val();
    }
    else {
        toastr.error('Enter Product Name');
        $("#txtproduct").focus();
        return false;
    }
    if ($("#ddlCatogery option:selected").val() != 0) {
        var productcatogery = $("#ddlCatogery option:selected").html();
    }
    else {
        toastr.error('Select Catogery');
        $("#ddlCatogery").focus();
        return false;
    }
    
    if ($("#txtcolour").val() != "") {
        var productcolour = $("#txtcolour").val();
    }
    else {
        toastr.error('Enter Product Colour');
        return false;
    }
    if ($("#txtprice").val() != "") {
        var productprice = $("#txtprice").val();
    }
    else {
        toastr.error('Enter Product Price');
        return false;
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
    if ($("#txtproductID").val() != "") {
        var id = $("#txtproductID").val();
    }
    else {
        toastr.error('Invalid Product ID');
        return false;
    }
    $formData.append('ProductName', productname);
    $formData.append('ProductCatogery', productcatogery);
    $formData.append('PC', productcolour);
    $formData.append('ProductPrice', productprice);
    $formData.append('UOM', uom);
    $formData.append('Id', id);
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
        success: function (response) {
            debugger
            toastr.success('Product Added Succesfully');
            debugger
            UOM();
            UOM1();
/*            ProductCategory();*/
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
    debugger
    var id = $("#txtproductID").val();
    $.ajax({
        type: "POST",
        url: "/Product/cheakforId",
        data: '{ id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (model) {
            debugger
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

var clearfunction = function () {
    debugger
    getProductList();
    $('#txtproduct').val("");
    $('#txtproductID').val("");
    $('#ddlcatogery').val("");
    $('#previews').val("");
    $('#ddlUOM').val("");
    $('#txtHt').val("");
    $('#txtWdt').val("");
    $('#txtDpt').val("");
    $('#txtTh').val("");
    $('#txtcolour').val("");
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
                /*{ 'data': 'PPrice', 'title': 'Product Price' },*/
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
                { 'data': 'ProductCatogery', 'title': 'Product Catogery' },
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
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="ProductDetails(' + "'" + item.ProductId + "'" + ');Modal2()" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblProducts_wrapper .col-md-6:eq(0)');
};

var Editdata = function (ProductId) {
    debugger
    var pid = $("#ProductId").val()
    var pNmae = document.getElementById("Txt_Prod").value;
    /*var cat = document.getElementById("ddlCatogery1 option:selected").value;*/
    var cat = document.getElementById("cata").value;
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
            toastr.success('Changes Completed');
            getProductList();
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

                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteI(' + "'" + item.Pic + "'" + ',' + "'" + item.Position + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="EditImg(' + "'" + item.Position + "'" + ')" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblProdImg_wrapper .col-md-6:eq(0)');
    debugger
    $("#t_nwbp1").val(response.ProductId);
    $("#postion").val(response.Position);
};

function EditImg(Position) {
    debugger
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
    debugger
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
    Position = Pic;
    debugger
    if (Position == 1) {
        toastr.error('This Photo Cannot Be Deleted');
        return false;
    }
    else {
       
    }
    ProdId = $('#prod').val();
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
            ImageDetails(prod);
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
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
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
    ProductId = $('#prod').val();
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
            ImageDetails(ProductId);
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
    ProductId = $('#prod').val();
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
            debugger
            toastr.success('Image Added');
            ImageDetails(ProductId);
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