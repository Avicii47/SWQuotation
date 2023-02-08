$(document).ready(function () {
    debugger
    var url = window.location.href;
    var split = url.split("QuotId=");
    var currentURL = split[1];
    var QuotId = currentURL;
    CustQuot(QuotId);
    Footer();
});

function CustQuot(QuotId) {
    debugger
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
                debugger
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
                $("#MobNo").html(response[0].MobNo).focus;
                $("#BillTo").html(response[0].Billto).focus;
                $("#ddlTaxes").val(response[0].Tax);
                $("#ShipTo").html(response[0].Shipto).focus;
                $("#Adv").html(response[0].Advance).focus;
                $("#Bal").html(response[0].Balance).focus;
                $("#Total").html(response[0].TotalPrice).focus;
                $("#ShipCost").html(response[0].ShipCost).focus;
                $("#IntallCost").html(response[0].InstallCost).focus;
                $("#CustMo").val(response[0].MobNo1).focus;
                GetQuotProduct(QuotId); 
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

function Footer() {
    let url = "../Customers/GetFooter";
    $.ajax({
        type: "POST",
        url: url,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#Display1").html(response[0].Display1).focus;
                $("#Mob1").html(response[0].MobNo1).focus;
                $("#Email1").html(response[0].Email1).focus;
                $("#Display2").html(response[1].Display1).focus;
                $("#Mob2").html(response[1].MobNo1).focus;
                $("#Email2").html(response[1].Email1).focus;
                $("#Display3").html(response[2].Display1).focus;
                $("#Display3").html(response[2].Display1).focus; 
                $("#Mob3").html(response[2].MobNo1).focus;
                $("#Email3").html(response[2].Email1).focus;
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

function SendMail() {
    var quotId = $('#QuotId').html();
    var element = document.getElementById('create_pdf');
    var opt = {
        margin: [10, 0, 0, 0],
        filename: 'Quotation Number ' + quotId ,
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).toPdf().output('datauristring').then(function (pdfAsString) {
        var pdfData = pdfAsString.trim();
        var base64result = pdfData.split(',')[1];
        var email = $("#Email").html();
        var quotId = $('#QuotId').html();
        var name = $('#CustName').html();
        debugger
        var reqData = {
            attachment: base64result,
            quot: 'Quotation Number ' + quotId + '.pdf',
            Email: email,
            Name: name
        };
        $.ajax({
            type: "POST",
            url: "../Customers/sendemail",
            data: JSON.stringify({ data: reqData }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger
                Swal.fire({
                    icon: 'success',
                    title: 'Mail Send!',
                });
            },
            error: function (respose) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went Wrong',
                    text: 'Error in sending Email',
                });
            }
        });
    });
}

function GetQuotProduct(QuotId) {
    let url = "../Customers/GetQuotProduct";
    $.ajax({
        type: "POST",
        url: url,
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger
            var html = "";
            $("#tblQuotProduts tbody").empty();
            $.each(response, function (index, elementValue) {
                debugger
                html += "<tr><td>" + "</td><td>" + elementValue.PName +
                                     "</td><td>" + '<center>' + elementValue.PPrice + '</center>' +
                                     "</td><td>" + '<center>' + elementValue.PCol + '</center>' +
                                     "</td><td>" + '<center>' + elementValue.Nou + '</center>' +
                                     "</td><td>" + '<center>' + elementValue.PQty + '</center>' +
                                     "</td><td>" + '<center>' + elementValue.TotalPrice + '</center>' +
                                     "</td><td>" + '<center><img src="/Uploads/' + elementValue.Img +
                                     '" style="height:120px;width:120px;"' + "</td></tr>";
            });
            $("#tblQuotProduts tbody").append(html);
        }
    });
}

function ProductList(response) {
    var datatableVariable = $("#tblQuotProduts").DataTable(
        {
            "responsive": false, "lengthChange": false, "autoWidth": false,
            "deferRender": false, "ordering": false,
            paging: false,
            searching: false,
            destroy: false,
            "info": false,
            data: response,
            columns: [
                {
                    "data": "id","title":"SNo.",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 'data': 'PName', 'title': 'Product Name',"width": 800},
                { 'data': 'PPrice', 'title': 'Per Product Price', "width": 80 },
                { 'data': 'PCol', 'title': 'Product Colour', "width": 80 },
                { 'data': 'PQty', 'title': 'Quantity', "width": 80 },
                { 'data': 'TotalPrice', 'title': 'Final Price',"width": 80 },
                {
                    'title': 'Product Image',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="/Uploads/' + JsonResultRow.Img + '" style="height:120px;width:120px;"/></center>';
                    }
                },
            ]
        }).buttons().container().appendTo('#tblQuotProduts_wrapper .col-md-6:eq(0)');
};

