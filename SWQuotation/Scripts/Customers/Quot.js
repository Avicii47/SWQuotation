$(document).ready(function () {
    debugger
    $('#divLoader').show();
    var url = window.location.href;
    var split = url.split("QuotId=");
    var currentURL = split[1];
    var QuotId = currentURL;
    CustQuot(QuotId);
    Footer();
    Savemail();
    //$('#divLoader').focus();
    $('#divLoader').hide();
});






function CustQuot(QuotId) {
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
    $('#divLoader').show();
    var quotId = $('#QuotId').html();
    var element = document.getElementById('create_pdf');
    var opt = {
        margin: [10, 0, 0, 0],
        filename: quotId ,
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
        
        var reqData = {
            attachment: base64result,
            quot: quotId + '.pdf',
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
                $('#divLoader').hide();
                Swal.fire({
                    icon: 'success',
                    title: 'Mail Send!',
                });
            },
            error: function (response) {
                $('#divLoader').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Something went Wrong',
                    text: 'Error in sending Email',
                });
            }
        });
    });
}


function Savemail() {
    
    var quotId = $('#QuotId').html();
    var element = document.getElementById('create_pdf');
    var opt = {
        margin: [10, 0, 0, 0],
        filename: quotId,
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).toPdf().output('datauristring').then(function (pdfAsString) {
     
        var pdfData = pdfAsString.trim();
        var base64result = pdfData.split(',')[1];
        var quotId = $('#QuotId').html();

        var reqData = {
            attachment: base64result,
            quot: quotId + '.pdf'
        }
        $.ajax({
            type: "POST",
            url: "../Customers/send",
            data: JSON.stringify({ data: reqData }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                //$('#divLoader').hide();
            },
            error: function (response) {
                
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
        success: ProductList,
    });
}

function ProductList(response) {
    var datatableVariable = $("#tblQuotProduts").DataTable(
        {
            "responsive": false, "lengthChange": false, "autoWidth": false,
            scrollX: false,
            "deferRender": false, "ordering": false,
            paging: false,
            searching: false,
            destroy: true,
            "bInfo": false,
            data: response,
            columns: [
                { 'data': 'Advance', 'title': 'SrNo.', "width": 80 },
                { 'data': 'PName', 'title': 'Product Name',"width": 800},
                { 'data': 'PPrice', 'title': 'Product Price', "width": 80 },
                { 'data': 'PQty', 'title': 'Qty', "width": 80 },
                { 'data': 'Nou', 'title': 'Units', "width": 80 },
                { 'data': 'DiscAmt', 'title': 'Discount', "width": 80 },
                { 'data': 'Prod', 'title': 'Final Amount', "width": 80 },
                {
                    'title': 'Product Image',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="/Uploads/' + JsonResultRow.Img + '" style="height:110px;width:110px;"/></center>';
                    }
                },
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();
                nb_cols = 4;
                var j = 3;

                while (j < nb_cols) {
                    var pageTotal = api
                        .column(j, { page: 'current' })
                        .data()
                        .reduce(function (a, b) {
                            return Number(a) + Number(b);
                        }, 0);
                    // Update footer
                    $(api.column(j).footer()).html(pageTotal);
                    j++;
                    var value = parseFloat(pageTotal).toFixed(2);
                
                }

                var api1 = this.api();
                nb_cols1 = 7;
                var i = 6;

                while (i < nb_cols1) {
                    var pageTotal = api1
                        .column(i, { page: 'current' })
                        .data()
                        .reduce(function (a, b) {
                            return Number(a) + Number(b);
                        }, 0);
                    // Update footer
                    $(api1.column(i).footer()).html(pageTotal);
                    i++;
                    var value = parseFloat(pageTotal).toFixed(2);
       
                }
            }
        }).buttons().container().appendTo('#tblQuotProduts_wrapper .col-md-6:eq(0)');
};




