$(document).ready(function () {
    getProductList();
});

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
                { 'data': 'UOM', 'title': 'UOM' },
                { 'data': 'Height', 'title': 'Height' },
                { 'data': 'Width', 'title': 'Width' },
                { 'data': 'Depth', 'title': 'Depth' },
                { 'data': 'Thickness', 'title': 'Thickness' },
                { 'data': 'ProductPrice', 'title': 'Product Price' },
                {
                    'data': null, title: 'Product Image', wrap: true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" onclick="ImageDetails(' + "'" + item.ProductId + "'" + ');Modal1()" value="0" class="btn btn-secondary btn-sm" id="btn-sa-secondary"><i class="fas fa-file-image"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblProducts_wrapper .col-md-6:eq(0)');
};

function Modal1() {
    
    $("#myModal2").modal('show');
};

function ImageDetails(ProductId) {
    
    $("#prod").val(ProductId);
    var model = { ProductId: ProductId };
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
                { 'data': 'Position', 'title': 'Position', "visible": false },
                { 'data': 'ProductId', 'title': 'Product Id' },
                {
                    'title': 'Product Image',
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






