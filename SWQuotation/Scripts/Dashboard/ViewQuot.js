$(document).ready(function () {
    debugger
    var url = window.location.href;
    var split = url.split("QuotId=");
    var currentURL = split[1];
    var QuotId = currentURL;
    Details(QuotId);
    /*BindTaxes();*/
    GetbillAdd();
    GetshipAdd();
});

function Details(QuotId) {
    let url = "../Home/QuotDetails";
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
                $("#QuotId").val(response[0].QuotId);
                $("#Txt_Prod").val(response[0].custId);
                $("#ExtBill").val(response[0].Billto);
                $("#ExtShip").val(response[0].Shipto);
                $("#Txt_Ht").val(response[0].gross);
                $("#Txt_Wdt").val(response[0].DiscAmt);
                $("#Txt_Dpt").val(response[0].NetAmt);
                $("#Txt_Th").val(response[0].TotalPrice);
                $("#Txtt_adva").val(response[0].Advance);
                $("#Txtt_bala").val(response[0].Balance);
                $("#Txt_Tc").val(response[0].TaxCode);
                $("#ddlTaxes").val(response[0].Tax);
                $("#Txt_CGST").val(response[0].CGST);
                $("#Txt_SGST").val(response[0].SGST);
                $("#Txt_IGST").val(response[0].IGST);
                if ($("#Txt_IGST").val() == 0) {
                    $("#IGST").hide();
                    $("#GST").show();
                    $("#Txt_totaltax").val(Number($("#Txt_CGST").val()) + Number($("#Txt_SGST").val()));
                } else {
                    $("#IGST").show();
                    $("#GST").hide();
                    $("#Txt_totaltax").val($("#Txt_IGST").val());
                };
                
                $("#Txt_t").val(response[0].Taxes);
                $("#Txttrasport").val(response[0].ShipCost);
                $("#TxtInstall").val(response[0].InstallCost);
                $("#Txtname").val(response[0].t_cnam);
                $("#Txtmob").val(response[0].t_cmob);
                $("#Txtamob").val(response[0].MobNo);
                $("#Email").val(response[0].Email1);
                $("#Txtdob").val(response[0].t_cdob);
                $("#Gst").val(response[0].GST);
                $("#Txt_tax").val(response[0].TaxName);
                addedProdlist();
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

function addedProdlist(QuotId) {
    QuotId = $("#QuotId").val();
    $.ajax({
        type: "POST",
        url: "/Customers/GetList",
        data: '{QuotId:"' + QuotId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: bindtotable,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function bindtotable(response) {
    var datatableVariable = $("#tblQuotation").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": true,
            "deferRender": true,
            paging: false,
            searching: true,
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
                    "data": "id", "title": "SNo.",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 'data': 'Position', 'title': 'Position', visible: false },
                /*{ 'data': 'PId', 'title': 'Position', visible: false },*/
                { 'data': 'PName', 'title': 'ProductName' },
                { 'data': 'PQty', 'title': 'Quantity' },
                { 'data': 'PPrice', 'title': 'ProductPrice' },
                { 'data': 'TPrice', 'title': 'DiscountedPrice' },


            ],
            "footerCallback": function (row, data, start, end, display) {
                debugger
                var api = this.api();
                nb_cols = api.columns().nodes().length;
                var j = 4;
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
                    $("#Txt_GPri").val(value).focus;
                    $("#Txt_DisAmt").val(value).focus;
                    //$("#Txt_Th").val(value).focus;
                }
            }

        }).buttons().container().appendTo('#tblQuotation_wrapper .col-md-6:eq(0)');
};

function BindTaxes() {

    let url = "../Customers/TaxesList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlTaxes").empty();
                $("#ddlTaxes").append($("<option></option>").val("0").html("Select Tax"));
                $.each(response, function (data, value) {
                    $("#ddlTaxes").append($("<option></option>").val(value.TaxCode).html(value.TaxName));
                });
            }
            else {
                $("#ddlTaxes").empty();
                $("#ddlTaxes").append($("<option disabled></option>").val(0).html("Select Tax"));
            }
            return $("#ddlTaxes option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

var GetCode1 = function (AddressCode) {
    $("#ShipAddress").val(AddressCode);
    $("#ExtShip").val(AddressCode);
    let url = "../Customers/GetCustAdd";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + AddressCode + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#NSTo").html(response[0].address).focus;
                $("#ESTo").html(response[0].address).focus;
                $("#ShipModal").modal('toggle');
                $("#myModal").modal('show');
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

var GetshipAdd = function (AddressCode) {
    var AddressCode = $("#ExtShip").val();
    let url = "../Customers/GetCustAdd";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + AddressCode + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                //$("#NSTo").html(response[0].address).focus;
                $("#ESTo").html(response[0].address).focus;
                //$("#ShipModal").modal('toggle');
                //$("#myModal").modal('show');
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

var GetCode = function (AddressCode) {

    $("#BillAddress").val(AddressCode);
    $("#ExtBill").val(AddressCode);
    let url = "../Customers/GetCustAdd";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + AddressCode + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#NBTo").html(response[0].address).focus;
                $("#EBTo").html(response[0].address).focus;
                $("#BillModal").modal('toggle');
                $("#myModal").modal('show');
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

var GetbillAdd = function (AddressCode) {
    var AddressCode = $("#ExtBill").val();

    let url = "../Customers/GetCustAdd";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + AddressCode + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                //$("#NBTo").html(response[0].address).focus;
                $("#EBTo").html(response[0].address).focus;
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