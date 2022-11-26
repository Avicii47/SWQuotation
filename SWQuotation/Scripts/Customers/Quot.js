$(document).ready(function () {

    var url = window.location.href;
    var split = url.split("QuotId=");
    var currentURL = split[1];
    var QuotId = currentURL;
    CustQuot(QuotId);
});

function CustQuot(QuotId) {
    //var model = { t_cmob: t_cmob };
    let url = "../Customers/CustQuot";
    $.ajax({
        type: "POST",
        url: url,
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#QuotId").html(response[0].QuotId).focus;
                $("#CustName").html(response[0].t_cnam).focus;
                $("#QuotDt").html(response[0].QuotDt).focus;
                $("#PhoneNo").html(response[0].t_cmob).focus;
                $("#CustAddress").html(response[0].t_cadd).focus;
                $("#Tax").html(response[0].Taxes).focus;
                $("#AltNo").html(response[0].t_catm).focus;
                $("#NetAmt").html(response[0].NetAmt).focus;
                $("#GAmt").html(response[0].GAmt).focus;
                $("#Discount").html(response[0].Diso).focus;
                $("#Email").html(response[0].t_cmai).focus;
                $("#Gst").html(response[0].GST).focus;
                $("#PhoneNo").html(response[0].t_cmob).focus;
                $("#BillTo").html(response[0].Billto).focus;
                $("#ShipTo").html(response[0].Shipto).focus;
                $("#Adv").html(response[0].Advance).focus;
                $("#Bal").html(response[0].Balance).focus;
                $("#Total").html(response[0].TotalPrice).focus;
                GetQuotProduct(QuotId); 
                return response;
                
            }
            else {
                return false;
            }
            return response;
            
        },
    });
}

function GetQuotProduct(QuotId) {
    debugger
    //var model = { t_cmob: t_cmob };
    let url = "../Customers/GetQuotProduct";
    $.ajax({
        type: "POST",
        url: url,
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
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
    debugger

    var datatableVariable = $("#tblQuotProduts").DataTable(

        {
            "responsive": false, "lengthChange": false, "autoWidth": false,
            "deferRender": true,
            paging: false,
            searching: false,
            destroy: true,
    

            data: response,
            columns: [
                { 'data': 'ProdId', 'title': 'Product Id', "visible": false },
                { 'data': 'PName', 'title': 'Product Name' },
                { 'data': 'PPrice', 'title': 'Product Price' },
                {
                    'title': 'Product Image',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="/Uploads/' + JsonResultRow.Img + '" style="height:100px;width:100px;"/></center>';
                    }
                },
                { 'data': 'PQty', 'title': 'Quantity' },
                { 'data': 'Diso', 'title': 'Discount' },
                { 'data': 'TotalPrice', 'title': 'TotalPrice' }, 
            ]
        }).buttons().container().appendTo('#tblQuotProduts_wrapper .col-md-6:eq(0)');
};