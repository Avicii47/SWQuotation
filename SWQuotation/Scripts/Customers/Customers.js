
$(document).ready(function () {

    ExiCust();
    BindProducts();
    getAddress();
    BindTaxes();
    BindCountry();

    $('#tblQuotation').DataTable(
        {
            "paging": false,
            "autoWidth": true,
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();
                nb_cols = api.columns().nodes().length;
                var j = 4;
                debugger
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
                }
                var api1 = this.api();
                nb_cols = api1.columns().nodes().length;
                var i = 5;
                debugger
                    /*while (i < nb_cols) {*/
                        var pageTotal1 = api1
                            .column(i, { page: 'current' })
                            .data()
                            .reduce(function (c, d) {
                                return Number(c) + Number(d);
                            }, 0);
                        // Update footer
                        $(api1.column(i).footer()).html(pageTotal1);
                        i++;
                    /*}*/
                
            }
        }
    );

})

function Modal() {

    $("#myModal").modal('show');
};

function Modal2() {

    $("#myModal2").modal('show');
};

function Modal3() {

    $("#myModal3").modal('show');
    getAddress1();

};

var CheckCust = function (t_cmob) {
    debugger
    var t_cmob = $("#t_cmob").val();
    $.ajax({
        url: "/Customers/CheakCustomer",
        method: "post",
        data: '{ t_cmob: "' + t_cmob + '" }',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger
            if (response.model == '1') {
                Swal.fire({
                    icon: 'success',
                    title: 'Customer Exist',
                    text: 'Customer Activity Is Present'
                });
                ExiCust();
                NewCustDetails(t_cmob);

            } else {
                Swal.fire({
                    icon: "warning",
                    title: 'Customer does not exist',
                });
                var Txt_tcmob = t_cmob;
                Txt_tcmob = $("#Txt_tcmob").val;
                NewCust();
                myFunction();
               /* addcustomer();*/
            }
        }
    });
};

function ExiCust() {
    $("#Exicnam").show();
    $("#Exicam").show();
    $('#Exicmob').attr('readonly', 'true');
    $("#Exidob").show();
    $("#Exicmai").show();
    $("#Exicgst").show();
    $("#ExtBillto").show();
    $("#ExtShipto").show();
    $("#ExiCust").show();
    BindState();

    $("#Txtt_cnam").hide();
    $("#Txtt_camo").hide();
    $("#Txtt_cdob").hide();
    $("#Txtt_cmai").hide();
    $("#Txtt_cgst").hide();
    $("#TxtShipto").hide();
    $("#TxtBillto").hide();
    $("#NewCust").hide();
}

function NewCust() {
    $("#Exicnam").hide();
    $("#Exicam").hide();
    $("#Exidob").hide();
    $("#Exicmai").hide();
    $("#Exicgst").hide();
    $("#ExtBillto").hide();
    $("#ExtShipto").hide();
    $("#ExiCust").hide();
    BindState();

    $("#Txtt_cnam").show();
    $("#Txtt_camo").show();
    $('#Exicmob').attr('readonly', 'true');
    $("#Txtt_cdob").show();
    $("#Txtt_cmai").show();
    $("#Txtt_cgst").show();
    $("#TxtShipto").show();
    $("#TxtBillto").show();
    $("#NewCust").show();
}

function NewCustDetails(t_cmob) {
    let url = "../Customers/GetNewCustomerDetails";
    $.ajax({
        type: "POST",
        url: url,
        data: '{t_cmob:"' + t_cmob + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger
            if (response != null) {
                $("#CuId").val(response[0].t_cuid).focus;
                $("#Exicnam").val(response[0].t_cnam).focus;
                $("#Exicmob").val(response[0].t_cmob).focus;
                $("#Exicam").val(response[0].t_catm).focus;
                $("#Exicmai").val(response[0].t_cmai).focus;
                $("#Exidob").val(response[0].t_cdob).focus;
                //$("#Exidob").attr('readonly', 'true');
                $("#Exicgst").val(response[0].t_cgst).focus;
                $("#ExtBill").val(response[0].Billto);
                $("#ExtShip").val(response[0].Shipto);
                
                return response;
            }
            else {
                return false;
            }
            return response;
            //addtoQuot();
        },
    });
}

var addcustomer = function () {
   
    var name = $("#Txtt_cnam").val();
    var cmob = $("#Exicmob").val();
    var camo = $("#Txtt_camo").val();
    var cdob = $("#Txtt_cdob").val();
    var cmai = $("#Txtt_cmai").val();
    var cgst = $("#Txtt_cgst").val();
    var billto = $("#BillAddress").val();
    var shipto = $("#ShipAddress").val();

    var data = {
       Name: name,
       mobile: cmob,
       alterMobile: camo,
       Mail: cmai,
       dob: cdob,
        GstNo: cgst,
        BillTo: billto,
        ShipTo: shipto,
    };


    $.ajax({
        url: "../Customers/AddCust",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            
            var CustId = response.model;
            (response.model == CustId);
            $("#CuId").val(CustId);
            addtoQuot();

        }
    })
};

var addAddress = function () {
 
    var name = $("#Txtt_cnam").val();
    var address = $("#Txtt_cadd").val();
    var pincode = $("#TxtPincode").val();
    var address2 = $("#Txtt_cadd2").val();
    var address3 = $("#Txtt_cadd3").val();
    var landmark = $("#TxtLandmark").val();
    var district = $("#TxtLandmark").val();
    var country = $("#ddlcountry option:selected").html();
    var state = $("#ddlStates option:selected").html();
    var city = $("#ddlCity option:selected").html();

    var data = {
        Name: name,
        Address: address,
        Address2: address2,
        Address3: address3,
        StateName: state,
        Pincode: pincode,
        Landmark: landmark,
        City: city,
        District: district,
        Country: country,
    };


    $.ajax({
        url: "../Customers/AddAddress ",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            getAddress();
        }
    })
};

function getAddress() {
    $.ajax({
        type: "POST",
        url: "/Customers/GetAddress",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AddressList,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function AddressList(response) {


    var datatableVariable = $("#tblAddress").DataTable(

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
                    'data': null, title: '', wrap: true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" onclick="GetCode(' + "'" + item.AddressCode + "'" + ')" value="0" data-dismiss="modal" class="btn btn-success btn-sm" id="btn-sa-confirm"><i class="fas fa-plus-circle"></i></button></div></center>'
                    },
                },
                { 'data': 'AddressCode', 'title': 'Address Code'/*, "visible": false*/ },
                { 'data': 't_cnam', 'title': 'Customer Name' },
                { 'data': 'City', 'title': 'City' },
                { 'data': 'District', 'title': 'District' },
                { 'data': 'State', 'title': 'State' },
                { 'data': 'Country', 'title': 'Country' },
                { 'data': 't_cadd', 'title': 'Address 1' },
                { 'data': 'Address2', 'title': 'Address 2' },
                { 'data': 'Address3', 'title': 'Address 3' },
                
            ]
        }).buttons().container().appendTo('#tblAddress_wrapper .col-md-6:eq(0)');
};

function getAddress1() {
    $.ajax({
        type: "POST",
        url: "/Customers/GetAddress",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AddressList1,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function AddressList1(response) {
 

    var datatableVariable = $("#tblAddress1").DataTable(

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
                    'data': null, title: '', wrap: true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" onclick="GetCode1(' + "'" + item.AddressCode + "'" + ')" value="0" data-dismiss="modal" class="btn btn-success btn-sm" id="btn-sa-confirm"><i class="fas fa-plus-circle"></i></button></div></center>'
                    },
                },
                { 'data': 'AddressCode', 'title': 'Address Code'/*, "visible": false*/ },
                { 'data': 't_cnam', 'title': 'Customer Name' },
                { 'data': 'City', 'title': 'City' },
                { 'data': 'District', 'title': 'District' },
                { 'data': 'State', 'title': 'State' },
                { 'data': 'Country', 'title': 'Country' },
                { 'data': 't_cadd', 'title': 'Address 1' },
                { 'data': 'Address2', 'title': 'Address 2' },
                { 'data': 'Address3', 'title': 'Address 3' },

            ]
        }).buttons().container().appendTo('#tblAddress1_wrapper .col-md-6:eq(0)');
};

var GetCode1 = function (AddressCode) {
    $("#ShipAddress").val(AddressCode);
}

var GetCode = function (AddressCode) {
    $("#BillAddress").val(AddressCode);
}

var addtoQuot = function () {
    debugger
    $('#CustId').val();
    var cuid = $("#CuId").val();
    
    if ($("#ExtBill").val() != "")
        var billto = $("#ExtBill").val();
    else
        var billto = $("#BillAddress").val();

    if ($("#ExtShip").val() != "")
        var shipto = $("#ExtShip").val();
    else
        var shipto = $("#ShipAddress").val();

    var model = {
        CustId: cuid,
        BillTo: billto,
        ShipTo: shipto,
    };

    $.ajax({
        url: "/Customers/AddtoQuot",
        method: "Post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (response) {
         
            var QuotId = response.model;
            (response.model == QuotId);
            $("#QuotId").val(QuotId);
            Swal.fire({
                icon: 'success',
                title: 'Quotation Data Added',
            })
        }
    })
};

function BindProducts() {
    let url = "../Customers/GetProductList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlproduct").empty();
                $("#ddlproduct").append($("<option></option>").val("0").html("Select Product"));
                $.each(response, function (data, value) {
                    $("#ddlproduct").append($("<option></option>").val(value.PId).html(value.PName));
                });
            }
            else {
                $("#ddlproduct").empty();
                $("#ddlproduct").append($("<option disabled></option>").val(0).html("Select product"));
            }
            return $("#ddlproduct option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindCountry() {
    let url = "../Customers/GetCountry";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlcountry").empty();
                $("#ddlcountry").append($("<option></option>").val("0").html("Select Country"));
                $.each(response, function (data, value) {
                    $("#ddlcountry").append($("<option></option>").val(value.Country).html(value.Country));
                });
            }
            else {
                $("#ddlcountry").empty();
                $("#ddlcountry").append($("<option disabled></option>").val(0).html("Select Country"));
            }
            return $("#ddlcountry option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}


function BindState() {

    let url = "../Customers/StateList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
            if (response != null) {
                $("#ddlStates").empty();
                $("#ddlStates").append($("<option></option>").val("0").html("Select State"));
                $.each(response, function (data, value) {
                    $("#ddlStates").append($("<option></option>").val(value.SID).html(value.State));
                });
            }
            else {
                $("#ddlStates").empty();
                $("#ddlStates").append($("<option disabled></option>").val(0).html("Select State"));
            }
            return $("#ddlStates option:selected").text();
            //var City = $("#ddlStates option:selected").text();
            //BindCity(City);
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindTaxes() {

    let url = "../Customers/TaxesList";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
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

function BindCity() {
   
    var StateId = $("#ddlStates option:selected").val();
    let url = "../Customers/CityList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + StateId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlCity").empty();
                $("#ddlCity").append($("<option></option>").val("0").html("Select City"));
                $.each(response, function (data, value) {
                    $("#ddlCity").append($("<option></option>").val(value.City).html(value.City));
                });
            }
            else {
                $("#ddlCity").empty();
                $("#ddlCity").append($("<option disabled></option>").val(0).html("Select City"));
            }
            return $("#ddlCity option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function GetPrice() {

    var PId = $('#ddlproduct option:selected').val();
    let url = "../Customers/GetPrice";
    $.ajax({
        type: "POST",
        url: url,
        data: '{PId:"' + PId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#Txt_Price").val(response[0].PPrice);
                return response;
            }
            else {
                toastr.error('Please Select Product.');
                $("#ddlproduct").focus();
                return false;
            }
            return response;
        },

    });
}

function getGST(tax) {
    let url = "../Customers/getGST";
    $.ajax({
        type: "POST",
        url: url,
        data: '{tax:"' + tax + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#TxtPER").val(response[0].Taxes);
                return response;
            }
            else {
                return false;
            }
            return response;
        },

    });
}

var addtoliner = function (quotId) {
    debugger
    var quotId = $("#QuotId").val();
    var productid = $("#ddlproduct option:selected").val();
    var product = $("#ddlproduct option:selected").html();
    var noofunits = $("#Txtt_No").val();
    var taxes = $("#ddlTaxes option:selected").val();
    var taxesinno = $('#Txt_TPrice1').val();
    var discprice = $('#Txt_netamount').val();

    if ($("#Txt_Dis").val() != "")
        var diso = $("#Txt_Dis").val();
    else
        var diso = 0;
    if ($("#Txt_DisN").val() != "")
        var disoN = $("#Txt_DisN").val();
    else
        var disoN = 0;

    var topr = $("#Txt_DisP").val();
    var taxescode = $('#ddlTaxes').val();

    if (parseInt($("#ddlTaxes").val()) == 2) {
        var cgst = $("#Txt_CGST").val();
        var sgst = $("#Txt_SGST").val();
        igst = 0;
    } else {
        var igst = $("#Txt_IGST").val();
        sgst = 0;
        cgst = 0;
    };
    var finalprice = $('#Txt_FPrice').val();
    var tax = $('#Txt_TPrice1').val();

    var model = {
        QuotationID: quotId,
        ProductId: productid,
        Product: product,
        Totalprice: topr,
        NoOfUnits: noofunits,
        Discount: diso,
        DiscountN: disoN,
        Taxes: taxes,
        Taxesinno: taxesinno,
        TaxCode: taxescode,
        CGST: cgst,
        SGST: sgst,
        IGST: igst,
        Discprice: discprice,
        FinalPrice: finalprice,
        Taxes: tax
    };

    $.ajax({
        url: "/Customers/AddtoLiner",
        method: "Post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (response) {
            //console.log(response.message);
            Swal.fire({
                icon: 'success',
                title: 'Product Added',
            });
            getList(quotId);
            clearfunction();
        }
    })
};

var clearfunction = function () {
    $('#ddlproduct').val("");
    $('#Txt_Price').val("");
    $('#Txtt_No').val("");
    $('#Txt_TPrice').val("");
    $('#Txt_Dis').val("");
    $('#Txt_DisN').val("");
    $('#ddlTaxes').val("");
    $('#Txt_CGST').val("");
    $('#Txt_SGST').val("");
    $('#Txt_IGST').val("");
    $('#Txt_netamount').val("");
    $('#Txt_DisP').val("");
    $('#Txt_TPrice1').val("");
    $('#Txt_FPrice').val("");
    document.getElementById("Txt_DisN").disabled = false;
    document.getElementById("Txt_Dis").disabled = false;
}

var getList = function (QuotId) {
  
    var model = { QuotId: QuotId };
    $.ajax({
        url: "/Customers/GetList",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: bindtotable,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
};

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
                { 'data': 'Position', 'title': 'SrNo.' },
                { 'data': 'PName', 'title': 'ProductName' },
                { 'data': 'PQty', 'title': 'Quantity' },
                { 'data': 'Diso', 'title': 'DiscountPrice' },
                { 'data': 'Taxes', 'title': 'Taxes' },
                { 'data': 'TPrice', 'title': 'TotalPrice' },
                //{
                //    'data': null, title: 'Delete', wrap: true, "render": function (item) {
                //        return '<div class="btn-group"><button type="button" data-toggle="modal" data-target="#exampleModal" onclick = "Delete(' + "'" + item.t_nwbp + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>'
                //    },
                //},
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();
                nb_cols = api.columns().nodes().length;
                var j = 5;
      
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
                }
                var api1 = this.api();
                nb_cols = api1.columns().nodes().length;
                var i = 4;
                debugger
                    var pageTotal1 = api1
                        .column(i, { page: 'current' })
                        .data()
                        .reduce(function (c, d) {
                            return Number(c) + Number(d);
                        }, 0);
                    // Update footer
                    $(api1.column(i).footer()).html(pageTotal1);
                    i++;
                    debugger
                    var value1 = parseFloat(pageTotal1).toFixed(2);
                    $("#Txt_totaltax").val(value1).focus;
            }
            
        }).buttons().container().appendTo('#tblQuotation_wrapper .col-md-6:eq(0)');
    
};

function CheckValidPhoneno() {

    var txtCustPhon = "";
    var txtCustPhon = $("#t_cmob").val()
    var ValidPhoneno = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (txtCustPhon != '') {

        if (txtCustPhon.match(ValidPhoneno)) {
            CheckCust();
            return true;
            //CheckCust();
        }
        else {
            toastr.error('Enter valid phone no.');
            $("#Txtt_cmob").val('');
            $("#Txtt_cmob").focus();
            return false;
        }
    }
}

function checkValidPhoneno() {

    var txtCustPhon1 = "";
    var txtCustPhon1 = $("#Txtt_camo").val()
    var ValidPhoneno = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (txtCustPhon1 != '') {

        if (txtCustPhon1.match(ValidPhoneno)) {
            return true;
        }
        else {
            toastr.error('Enter valid phone no.');
            $("#Txtt_camo").val('');
            $("#Txtt_camo").focus();
            return false;
        }
    }
}

function CheckEmailSalesAct() {
    var mailid = '';
    mailid = $("#Txtt_cmai").val();
    var EmailCheck = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (mailid != '') {
        if (mailid.match(EmailCheck)) {
            return true;
        }
        else {
            toastr.error('Enter valid E-mail address.');
            $("#Txtt_cmai").val('');
            $("#Txtt_cmai").focus();
            return false;
        }
    }
}

var FinalQuot = function (QuotId) {
    debugger
    var quotId = $("#QuotId").val();
    var totalprice = $("#Txt_GPri").val();
    var advance = $("#Txtt_adva").val();
    var balance = $("#Txtt_bala").val();
    var cId = $("#Txtt_bala").val();
    var ttax = $("#Txt_totaltax").val();
    var gamt = $("#Txt_Price").val();
    var discamt = $("#Txt_netamount").val();
    var netamt = $("#Txt_DisP").val();

    var data = {
        QuotId: quotId,
        Advance: advance,
        Balance: balance,
        TotalPrice: totalprice,
        CustId: cId,
        TTax: ttax,
        GAmt: gamt,
        DiscAmt: discamt,
        NetAmt: netamt,
    };
    $.ajax({
        url: "../Customers/FinalQuotation",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
            var QuotId = response.model;
            (response.model == QuotId);
            $("#QuotId").val(QuotId);
            //$("#CuId").val(CustId);
            pageRedirect(QuotId);
        }
    })
};

function pageRedirect(QuotId, CustId) {
    debugger
    var QId = QuotId;
    window.location.href = "/Customers/Quot?QuotId=" + QuotId;   

    $("#QuotId").val(QId);
}


function CustQuot(QuotId, CustId) {
    debugger
    var model = { t_cmob: t_cmob };
    let url = "../Customers/GetNewCustomerDetails";
    $.ajax({
        type: "POST",
        url: url,
        data: '{t_cmob:"' + t_cmob + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#CustId").val(response[0].t_cuid).focus;
                $("#Exicnam").val(response[0].t_cnam).focus;
                $("#Exiadd").val(response[0].t_cadd).focus;
                $("#Exicmob").val(response[0].t_cmob).focus;
                $("#Exicam").val(response[0].t_catm).focus;
                $("#Exicmai").val(response[0].t_cmai).focus;
                $("#Exidob").val(response[0].t_cdob).focus;
                $("#Exicgst").val(response[0].t_cgst).focus;
                $("#ddlStates").val(response[0].State).focus;
                return response;
            }
            else {
                return false;
            }
            return response;
        },
    });
}