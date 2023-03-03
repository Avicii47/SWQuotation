$(document).ready(function () {
    debugger
    var url = window.location.href;
    var split = url.split("QuotId=");
    var currentURL = split[1];
    var split1 = url.split("ID=");
    var currentURL1 = split1[1];
    $("#ID").html(currentURL1);
    var QuotId = currentURL;
    Footer();
    getQueryParams(url);
    Pdf();
       //window.open(
       //     "https://wa.me/"
       // );

});


function Pdf() {
    debugger
    var quotId = $('#QuotId').html();
    var element = document.getElementById('create_pdf');
    var opt = {
        margin: [3, 0, 0, 0],
        filename: 'Quotation Number ' + quotId,
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).toPdf().save();
}



function getQueryParams(url) {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    })
    var p = params.QuotId;
    var ID = params.ID;
    CustQuot(p,ID);
    GetQuotProduct(p);
}

function CustQuot(p,ID) {
    let url = "../Customers/CustQuots";
    $.ajax({
        type: "POST",
        url: url,
        data: '{QuotId:"' + p + '",ID:"' + ID + '"}',
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
                return response;
            }
            else {
                return false;
            }
            return response;
        },
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
                $("#Mob3").html(response[2].MobNo1).focus;
                $("#Email3").html(response[2].Email1).focus;
                return response;
            }
            else {
                return false;
            }
            return response;
        },
    });
}

function GetQuotProduct(p) {
    let url = "../Customers/GetQuotProduct";
    $.ajax({
        type: "POST",
        url: url,
        data: '{QuotId:"' + p + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
            $("#tblQuotProduts tbody").empty();
            $.each(response, function (index, elementValue) {
                
                html += "<tr><td>" + "</td><td>" + elementValue.PName + "</td><td>" + '<center>' + elementValue.PPrice + '</center>' + "</td><td>" + '<center>' + elementValue.PCol + '</center>' + "</td><td>" + '<center>' + elementValue.PQty + '</center>' + "</td><td>" + '<center>' + elementValue.TotalPrice + '</center>' + "</td><td>" + '<center><img src="/Uploads/' + elementValue.Img + '" style="height:120px;width:120px;"' + "</td></tr>";
            });
            $("#tblQuotProduts tbody").append(html);
        }
    });
}