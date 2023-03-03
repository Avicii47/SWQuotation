$(document).ready(function () {
    ExiCust();
    BindProducts();
    getAddress();
    getAddress1();
    BindTaxes();
    BindCountry();
    BindCountrys();
    newquot();
    BindECountry();
    BindEState();
    BindState();
    BindTaxes();
    
    $("#QuotId1").hide();
    $('#tblQuotation').DataTable(
        {
            "paging": false,
            "autoWidth": true,
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();
                nb_cols = api.columns().nodes().length;
                var j = 10;
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
            }
        }
    );
    $("#t_cmob").focus();
})

function billtoModal() {

    getAddress();
    /*getAddress1();*/
    $('#myModal').modal('toggle');
    $("#BillModal").modal('show');
    BindEState();
    BindState();
};

function shiptoModal() {
   /* getAddress();*/
    getAddress1();
    $('#myModal').modal('toggle');
    $("#ShipModal").modal('show');
    BindEState();
    BindState();
};

var GetsCode = function (model) {
    $("#ShipAddress").val(model.model);
    $("#ExtShip").val(model.model);
    let url = "../Customers/GetCustAdd";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + model.model + '"}',
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

var GetbillCode = function (model) {
    $("#BillAddress").val(model.model);
    $("#ExtBill").val(model.model);
    let url = "../Customers/GetCustAdd";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + model.model + '"}',
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

function AddbillAddress() {
    $("#AddNewAddressModal").modal('show');
};

function AddSAddress() {
    BindState1();
    $("#AddShipAddress").modal('show');
};

var CheckCust = function (t_cmob) {
    $("#t_cmob").blur();
    var t_cmob = $("#t_cmob").val();
    $.ajax({
        url: "/Customers/CheakCustomer",
        method: "post",
        data: '{ t_cmob: "' + t_cmob + '" }',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.model == '1') {
                debugger
                toastr.success('Customer Activity Is Present');
                ExiCust();
                NewCustDetails(t_cmob);
                $("#ddlproduct").focus();
                document.getElementById('AddCustomers').style.display = 'none';
               
            } else {
                Swal.fire({
                    icon: "warning",
                    title: 'Customer does not exist',
                });
                var Txt_tcmob = t_cmob;
                Txt_tcmob = $("#Txt_tcmob").val;
                $("#Txtt_cnam").focus();
                NewCust();
                //myFunction();
                document.getElementById('AddtoQuot').style.display = 'none';
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
};

function ExiCust() {
    $("#Exicnam").show();
    $("#Exicam").show();
    $('#Exicmob').attr('readonly', 'true');
    $("#Exidob").show();
    $("#Exicmai").show();
    $("#Exicgst").show();
    $("#ExiCustAdd").show();
   /* BindState();*/

    $("#Txtt_cnam").hide();
    $("#Txtt_camo").hide();
    $("#Txtt_cdob").hide();
    $("#Txtt_cmai").hide();
    $("#Txtt_cgst").hide();
    $("#NewCust").hide();
    $("#newcustadd").hide();
}

function NewCust() {
    
    $("#Exicnam").hide();
    $("#Exicam").hide();
    $("#Exidob").hide();
    $("#Exicmai").hide();
    $("#Exicgst").hide();
    $("#ExiCustAdd").hide();
    $("#ddlproduct").attr("disabled", "disabled");
    /*BindState();*/

    $("#Txtt_cnam").show();
    $("#Txtt_camo").show();
    $('#Exicmob').attr('readonly', 'true');
    $("#Txtt_cdob").show();
    $("#Txtt_cmai").show();
    $("#Txtt_cgst").show();
    $("#NewCust").show();
    $("#newcustadd").show();
}

function newquot() {
    
    $("#ddlproduct").attr("disabled", true);
    $("#Txt_Price").attr("disabled", true);
    $("#Txtt_No").attr("disabled", true);
    $("#Txt_netamount").attr("disabled", true);
    $("#Txt_TPrice").attr("disabled", true);
    $("#Txt_Dis").attr("disabled", true);
    $("#Txt_DisN").attr("disabled", true);
    $("#ddlTaxes").attr("disabled", true);
    $("#Txt_totaltax").attr("disabled", true);
    $("#Txttrasport").attr("disabled", true);
    $("#Txt_IGST").attr("disabled", true);
    $("#TxtInstall").attr("disabled", true);
    $("#Txtt_adva").attr("disabled", true);
    $("#ExtBill").attr("disabled", true);
    $("#ExtShip").attr("disabled", true);
    $("#confirm1").attr("disabled", true);
    $("#AddtoQuot").attr("disabled", true);
}

function newquot0() {
    $("#ddlproduct").attr("disabled", false );
    $("#Txt_Price").attr("disabled", false );
    $("#Txtt_No").attr("disabled", false );
    $("#Txt_netamount").attr("disabled", false );
    //$("#Btnsuccess1").attr("disabled", false );
    $("#Txt_TPrice").attr("disabled", false );
    $("#Txt_Dis").attr("disabled", false );
    $("#Txt_DisN").attr("disabled", false );
}

function newquot1() {
    debugger
    $("#ddlTaxes").attr("disabled", false );
    $("#Txt_totaltax").attr("disabled", false );
    $("#Txttrasport").attr("disabled", false );
    $("#Txt_IGST").attr("disabled", false );
    $("#TxtInstall").attr("disabled", false );
    $("#Txtt_adva").attr("disabled", false);
    gettaxes();
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
            
            if (response != null) {
                $("#CuId").val(response[0].t_cuid).focus;
                $("#Exicnam").val(response[0].t_cnam).focus;
                $("#Exicmob").val(response[0].t_cmob).focus;
                $("#Exicam").val(response[0].t_catm).focus;
                $("#Exicmai").val(response[0].t_cmai).focus;
                $("#Exidob").val(response[0].t_cdob).focus;

                if ($("#Exidob").val() == "01-01-2001 00:00:00") {
                    $("#Exidob").val("");
                }
                else {
                    $("#Exidob").val(response[0].t_cdob).focus;
                }
                
                $("#Exicgst").val(response[0].t_cgst).focus;
                $("#ExtBill").val(response[0].Billto);
                $("#ExtShip").val(response[0].Shipto);
                var ship = $("#ExtShip").val();
                GetCode1(ship);
                var bill = $("#ExtBill").val();
                $("#ExiCust").show();
                GetCode(bill);
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

var addcustomer = function () {
    
    if ($("#Txtt_cnam").val() != "") {
        var name = $("#Txtt_cnam").val();
    }
    else {
        toastr.error('Enter Customer Name');
        return false;
    }
    if ($("#Exicmob").val() != "") {
        var cmob = $("#Exicmob").val();
    }
    else {
        toastr.error('Enter Mob.No');
        return false;
    }
    if ($("#Txtt_camo").val() != "") {
        var camo = $("#Txtt_camo").val();
    }
    else {
        var camo = $("#Exicmob").val();
    }

    if ($("#Txtt_cdob").val() != "") {
        var cdob = $("#Txtt_cdob").val();
    }
    else {
        var cdob = "2001-01-01"
    }

    if ($("#Txtt_cmai").val() != "") {
        var cmai = $("#Txtt_cmai").val();
    }
    else {
        toastr.error('Enter Email');
        return false;
    }

    if ($("#ExtBill").val() != "") {
        var billto = $("#ExtBill").val();
    }
    else {
        toastr.error('Enter Bill Address');
        return false;
    }
    if ($("#ExtShip").val() != "") {
        var shipto = $("#ExtShip").val();
    }
    else {
        toastr.error('Enter Ship Address');
        return false;
    }
    var cgst = $("#Txtt_cgst").val();


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
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response.model,
            });
        }
    })
};

var addbillAddress = function () {
    debugger
  
    var name = "0";

    if ($("#CuId").val() == "") {
        var name = "0";
    }
    else {
        var name = $("#CuId").val();
    }



    if ($("#Txtt_cadd").val() != "") {
        var address = $("#Txtt_cadd").val();
    }
    else {
        toastr.error('Enter Address');
        $("#Txtt_cadd").val().focus;
        return false;
    }

    if ($("#Txtt_cadd2").val() != "") {
        var address2 = $("#Txtt_cadd2").val();
    }
    else {
        toastr.error('Enter Address');
        return false;
    }

    if ($("#Txtt_cadd3").val() != "") {
        var address3 = $("#Txtt_cadd3").val();
    }
    else {
        toastr.error('Enter Address');
        return false;
    }

    if ($("#TxtLandmark").val() != "") {
        var landmark = $("#TxtLandmark").val();
    }
    else {
        toastr.error('Enter Landmark');
        return false;
    }

    if ($("#Txtt_dist").val() != "") {
        var district = $("#Txtt_dist").val();
    }
    else {
        toastr.error('Enter District');
        return false;
    }

    if ($("#ddlcountry option:selected").val() == 0) {
        toastr.error('Select Country');
        return false;
    }
    else {

        var country = $("#ddlcountry option:selected").val();
    }

    if ($("#ddlStates option:selected").val() == 0) {
        toastr.error('Select State');
        return false;
    }
    else {
        var state = $("#ddlStates option:selected").val();
    }

    if ($("#ddlCity option:selected").val() == 0) {
        toastr.error('Select City');
        return false;
    }
    else {
        var city = $("#ddlCity option:selected").html();
    }

    if ($("#TxtPincode").val() != "") {
        var pincode = $("#TxtPincode").val();
    }
    else {
        toastr.error('Enter Pincode');
        return false;
    }


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
        success: function (model) {
            toastr.success('Address Added');
            getAddress();
            clean();
            $("#AddbillAddress").modal('hide');
            $("#ShipModal").modal('hide');
            GetbillCode(model);
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    })
};

var clean = function () {
    $("#Txtt_cadd").val('');
    $("#Txtt_cadd2").val('');
    $("#Txtt_cadd3").val('');
    BindCountry();
    BindState();
    $("#ddlCity").val('');
    $("#Txtt_dist").val('');
    $("#TxtLandmark").val('');
    $("#TxtPincode").val('');

    $("#Txtt_cadds").val('');
    $("#Txtt_cadd2s").val('');
    $("#Txtt_cadd3s").val('');
    BindCountrys();
    BindState1();
    $("#ddlCitys").val('');
    $("#Txtt_dists").val('');
    $("#TxtLandmarks").val('');
    $("#TxtPincodes").val('');

}



var addshipAddress = function () {
    debugger

    var name = "0";
    if ($("#CuId").val() == "") {
        var name = "0";
    }
    else {
        var name = $("#CuId").val();
    }


    if ($("#Txtt_cadds").val() != "") {
        var address = $("#Txtt_cadds").val();
    }
    else {
        toastr.error('Enter Address');
        $("#Txtt_cadds").val().focus;
        return false;
    }

    if ($("#Txtt_cadd2s").val() != "") {
        var address2 = $("#Txtt_cadd2s").val();
    }
    else {
        toastr.error('Enter Address 2');
        return false;
    }

    if ($("#Txtt_cadd3s").val() != "") {
        var address3 = $("#Txtt_cadd3s").val();
    }
    else {
        toastr.error('Enter Address 3');
        return false;
    }

    if ($("#TxtLandmarks").val() != "") {
        var landmark = $("#TxtLandmarks").val();
    }
    else {
        toastr.error('Enter Landmarks');
        return false;
    }

    if ($("#Txtt_dists").val() != "") {
        var district = $("#Txtt_dists").val();
    }
    else {
        toastr.error('Enter District');
        return false;
    }

    if ($("#ddlcountrys option:selected").val() == 0) {
        toastr.error('Select Country');
        return false;
    }
    else {

        var country = $("#ddlcountrys option:selected").val();
    }

    if ($("#ddlStatess option:selected").val() == 0) {
        toastr.error('Select State');
        return false;
    }
    else {

        var state = $("#ddlStatess option:selected").val();
    }

    if ($("#ddlCitys option:selected").val() == 0) {
        toastr.error('Select City');
        return false;
    }
    else {
        var city = $("#ddlCitys option:selected").html();
    }

    if ($("#TxtPincodes").val() != "") {
        var pincode = $("#TxtPincodes").val();
    }
    else {
        toastr.error('Enter Pincode');
        return false;
    }

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
            debugger
            var i = response.model;
            toastr.success('Address Added');
            getAddress();
            clean();
            $("#AddShipAddress").modal('hide');
            $("#ShipModal").modal('hide');
            GetScode(i);
            
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    })
};

var GetScode = function (response) {
    debugger
    $("#ShipAddress").val(response);
    $("#ExtShip").val(response);
    let url = "../Customers/GetCustAdd";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + response + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger
            if (response != null) {
                $("#ESTo").html(response[0].address).focus;
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

function getAddress() {
    debugger
    if ($('#CuId').val() == "") {
        var custid = "0";
    }
    else {
        var custid = $('#CuId').val();
    }
    $.ajax({
        type: "POST",
        url: "/Customers/GetAddress",
        data: '{custid:"' + custid + '"}',
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
                        return '<center><div class="btn-group"><button type="button" onclick="GetCode(' + "'" + item.AddressCode + "'" + ')" value="0" data-dismiss="modal" class="btn btn-secondary btn-sm" style="height: 34.25px; width: 31.5px;" id="btn-sa-confirm"><i class="fas fa-plus-circle" style="margin-left:-2px;"></i></button></div></center>'
                    },
                },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" style="height: 34.25px; width: 31.5px;" data-toggle="modal" onclick = "DeleteADD(' + "'" + item.AddressCode + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash" style="margin-left:-2px;"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" style="height: 34.25px; width: 31.5px;" onclick="AddressDetails(' + "'" + item.AddressCode + "'" + ');Editaddmodal()" class="btn btn-secondary btn-sm"  id="btn-sa-edit"><i class="nav-icon fas fa-edit" style="margin-left:-2px;"></i></button></div></center>'
                    },
                }, 
                { 'data': 'AddressCode', 'title': 'Address Code'/*, "visible": false*/ },
                { 'data': 't_cnam', 'title': 'Customer Name', visible: false },
                { 'data': 'City', 'title': 'City' },
                { 'data': 'District', 'title': 'District' },
                { 'data': 'State', 'title': 'State' },
                { 'data': 'Country', 'title': 'Country' },
                { 'data': 't_cadd', 'title': 'Address 1' },
                { 'data': 'Address2', 'title': 'Address 2' },
                { 'data': 'Address3', 'title': 'Address 3' },
                { 'data': 'Pincode', 'title': 'Pincode' },
                
            ]
        }).buttons().container().appendTo('#tblAddress_wrapper .col-md-6:eq(0)');
};

function getAddress1() {
    debugger
    if ($('#CuId').val() == "") {
        var custid = "0";
    }
    else {
        var custid = $('#CuId').val();
    }
    //var custid = $('#CuId').val();
    $.ajax({
        type: "POST",
        url: "/Customers/GetAddress",
        data: '{custid:"' + custid + '"}',
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
                        return '<center><div class="btn-group"><button type="button" onclick="GetCode1(' + "'" + item.AddressCode + "'" + ')" value="0" data-dismiss="modal" style="height: 34.25px; width: 31.5px;" class="btn btn-secondary btn-sm" id="btn-sa-confirm"><i class="fas fa-plus-circle" style="margin-left:-2px;"></i></button></div></center>'
                    },
                },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" style="height: 34.25px; width: 31.5px;" onclick = "DeleteADD(' + "'" + item.AddressCode + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"style="margin-left:-2px;"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" style="height: 34.25px; width: 31.5px;" onclick="AddressDetails(' + "'" + item.AddressCode + "'" + ');Editaddmodal1()" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"style="margin-left:-2px;"></i></button></div></center>'
                    },
                },
                { 'data': 'AddressCode', 'title': 'Address Code'/*, "visible": false*/ },
                { 'data': 't_cnam', 'title': 'Customer Name', visible: false },
                { 'data': 'City', 'title': 'City' },
                { 'data': 'District', 'title': 'District' },
                { 'data': 'State', 'title': 'State' },
                { 'data': 'Country', 'title': 'Country' },
                { 'data': 't_cadd', 'title': 'Address 1' },
                { 'data': 'Address2', 'title': 'Address 2' },
                { 'data': 'Address3', 'title': 'Address 3' },
                { 'data': 'Pincode', 'title': 'Pincode' },

            ]
        }).buttons().container().appendTo('#tblAddress1_wrapper .col-md-6:eq(0)');
};

function AddressDetails(AddressCode) {
    let url = "../Customers/AddressDetails";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + AddressCode + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                debugger
                $("#Acode").val(response[0].AddressCode);
                $("#Aname").val(response[0].t_cnam);
                $("#AAdd1").val(response[0].address);
                $("#AAdd2").val(response[0].Address2);
                $("#AAdd3").val(response[0].Address3);
                $("#ddlEcountry").val(response[0].Country);
                $("#ddlEStates").val(response[0].State);
                var city = response[0].City;
                BindECity(city);
                
                $("#ddlECity").text(response[0].City);
                $("#ADist").val(response[0].District);
                $("#APin").val(response[0].Pincode);
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

function Editaddmodal() {
    
    $("#EditAddress").modal('show');
};

function Editaddmodal1() {
    
    $("#EditAddress").modal('show');
};

var DeleteADD = function (AddressCode) {
    $.ajax({
        url: "/Customers/DeleteADD",
        method: "post",
        data: '{AddressCode:"' + AddressCode + '"}',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (model) {
            if (model.model == '0') {
                toastr.warning('Address Is Added In Quotation');
                getAddress1();
                getAddress();
            } else {
                toastr.success('Address Deleted');
                getAddress1();
                getAddress();
            }
        }
    });
};

var EditADD = function () {
    debugger
    var addcode = $("#Acode").val()
    var add1 = $("#AAdd1").val()
    var add2 = $("#AAdd2").val();
    var add3 = $("#AAdd3").val();
    var country = document.getElementById("ddlEcountry").value;
    var state = $("#ddlEStates").val();
    var city = $("#ddlECity option:selected").html();
    var dist = $("#ADist").val();
    var pin = $("#APin").val();

    var model = {
        addcode: addcode,
        Add1: add1,
        Add2: add2,
        Add3: add3,
        Country: country,
        City: city,
        Dist: dist,
        Pin: pin,
        State: state,
    };

    $.ajax({
        url: "../Customers/EditADD ",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response);
            toastr.success('Customer Detail Changed');
            getAddress();
            getAddress1();
            $('#EditAddress').modal('toggle');
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
};

function BindECountry() {
    debugger
    let url = "../Customers/GetCountry";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlEcountry").empty();
                $("#ddlEcountry").append($("<option></option>").val("IND").html("INDIA"));
                $.each(response, function (data, value) {
                    $("#ddlEcountry").append($("<option></option>").val(value.PId).html(value.Country));
                });
            }
            else {
                $("#ddlEcountry").empty();
                $("#ddlEcountry").append($("<option disabled></option>").val(0).html("Select Country"));
            }
            return $("#ddlEcountry").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindEState() {
    var countID = $('#ddlEcountry').val();
    let url = "../Customers/StateList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + countID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlEStates").empty();
                $("#ddlEStates").append($("<option></option>").val("0").html("Select State"));
                $.each(response, function (data, value) {
                    $("#ddlEStates").append($("<option></option>").val(value.SID).html(value.State));
                });
            }
            else {
                $("#ddlEStates").empty();
                $("#ddlEStates").append($("<option disabled></option>").val(0).html("Select State"));
            }
            return $("#ddlEStates option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindECity(city) {
    debugger
    var StateId = $("#ddlEStates option:selected").val();
    let url = "../Customers/CityList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + StateId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlECity").empty();
                $("#ddlECity").append($("<option></option>").val("0").html("Select City"));
                $.each(response, function (data, value) {
                    $("#ddlECity").append($("<option></option>").val(value.SID).html(value.City));
                });
            }
            else {
                $("#ddlECity").empty();
                $("#ddlECity").append($("<option disabled></option>").val(0).html("Select City"));
            }
            debugger
            return $("#ddlECity option:selected").text();
            return $("#ddlECity").text(city);
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
                //$("#NSTo").html(response[0].address).focus;
                $("#ESTo").html(response[0].address).focus;
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




var addtoQuot = function () {
    
    if ($("#CuId").val() != "") {
        var cuid = $("#CuId").val();
    }
    else {
        toastr.error('Customer Not Found');
        return false;
    }

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
            toastr.success('Quotation ID Generated');
            
            $("#QuotId1").show();
            $("#BillAddress").focus();
            document.getElementById('AddCustomers').style.display = 'none';
            document.getElementById('AddCustomers').style.display = 'none';
            document.getElementById("Quot").disabled = true;
            newquot0();
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
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
                $("#ddlcountry").append($("<option></option>").val("IND").html("INDIA"));
                $.each(response, function (data, value) {
                    $("#ddlcountry").append($("<option></option>").val(value.PId).html(value.Country));
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


function BindCountrys() {
    let url = "../Customers/GetCountry";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response != null) {
                $("#ddlcountrys").empty();
                $("#ddlcountrys").append($("<option></option>").val("IND").html("INDIA"));
                $.each(response, function (data, value) {
                    $("#ddlcountrys").append($("<option></option>").val(value.PId).html(value.Country));
                });
            }
            else {
                $("#ddlcountrys").empty();
                $("#ddlcountrys").append($("<option disabled></option>").val(0).html("Select Country"));
            }
            return $("#ddlcountrys option:selected").text();
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
                    $("#ddlCity").append($("<option></option>").val(value.SID).html(value.City));
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

function BindCity1() {
    var StateId = $("#ddlStatess option:selected").val();
    let url = "../Customers/CityList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + StateId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlCitys").empty();
                $("#ddlCitys").append($("<option></option>").val("0").html("Select City"));
                $.each(response, function (data, value) {
                    $("#ddlCitys").append($("<option></option>").val(value.SID).html(value.City));
                });
            }
            else {
                $("#ddlCitys").empty();
                $("#ddlCitys").append($("<option disabled></option>").val(0).html("Select City"));
            }
            return $("#ddlCitys option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}



function BindState() {
    var countID = $('#ddlcountry').val();
    let url = "../Customers/StateList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + countID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
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
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindState1() {
    debugger
    var countID = $('#ddlcountrys').val();
    let url = "../Customers/StateList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + countID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlStatess").empty();
                $("#ddlStatess").append($("<option></option>").val("0").html("Select State"));
                $.each(response, function (data, value) {
                    $("#ddlStatess").append($("<option></option>").val(value.SID).html(value.State));
                });
            }
            else {
                $("#ddlStatess").empty();
                $("#ddlStatess").append($("<option disabled></option>").val(0).html("Select State"));
            }
            return $("#ddlStatess option:selected").text();
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
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
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
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
}

function cheakProduct() {
    debugger
    if ($("#ddlproduct").val() == '') {
        toastr.error('Please Select A Product!');
        BindProducts();
        $("#ddlproduct").focus();
        return false;
    }
    else {
        addtoliner();
        cheakTaxes();
    }
}

var cheakTaxes = function () {
    
    var billto = $("#ExtBill").val();
    var shipto = $("#ExtShip").val();
    var model = {
        BillTo: billto,
        ShipTo: shipto,
    };
    $.ajax({
        url: "/Customers/cheakTaxes",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            
            if (response.model == '1') {
                newquot1();
                $("#ddlTaxes").empty();
                $("#ddlTaxes").append($("<option></option>").val("2").html("IntrState(CGST+SGST)"));
                
            } else {
                $("#ddlTaxes").empty();
                $("#ddlTaxes").append($("<option></option>").val("3").html("InterState(IGST)"));
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
};

var addtoliner = function (quotId) {
    debugger
    var quotId = $("#QuotId").val();
    var productid = $("#ddlproduct option:selected").val();
    var product = $("#ddlproduct option:selected").html();
    var noofunits = $("#Txtt_No").val();

    if ($("#ddlproduct option:selected").val() == "0") {
        toastr.error('Please Select Produt');
        return false;
    }
    else {
        var productid = $("#ddlproduct option:selected").val();
        var product = $("#ddlproduct option:selected").html();
    }

    if ($("#Txtt_No").val() != "") {
        var diso = $("#Txt_Dis").val();
    }
    else {
        toastr.error('Please Select No. of Units');
        return false;
    }

    if ($("#Txtt_No").val() == "0") {
        toastr.error('Please Select No. of Units');
        return false;
    }
    else {
      
    }

    var discprice = $('#Txt_netamount').val();
    if ($("#Txt_Dis").val() != "") {
        var diso = $("#Txt_Dis").val();
    }
    else {
        var diso = 0;
    }
    if ($("#Txt_DisN").val() != "") {
        var disoN = $("#Txt_DisN").val();
    }
    else {
        var disoN = 0;
    }
    var topr = $("#Txt_DisP").val();
    var finalprice = $('#Txt_DisP').val();
    var tax = $('#Txt_TPrice1').val();

    if ($('#Txt_Dis').val() == "" || $('#Txt_Dis').val() == "0") {
        debugger
        discprice = 0;
    }
    else {
        discprice = $('#Txt_netamount').val();
    }

    if ($('#Txt_DisN').val() == "" || $('#Txt_DisN').val() == "0") {
        debugger
        
        discprice = $('#Txt_netamount').val();
    }
    else {
        discprice = disoN;
    }

    if (diso == "0" && disoN == "0") {
        debugger
        discprice = 0;
    }
    else {

    }


    var model = {
        QuotationID: quotId,
        ProductId: productid,
        Product: product,
        Totalprice: topr,
        NoOfUnits: noofunits,
        Discprice: discprice,
        Discount: diso,
        DiscountN: disoN,
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
            toastr.success('Product Added');
            getList(quotId);
            clearfunction();
            newquot1();
            $("#ddlTaxes").focus();
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    })
};

var clearfunction = function () {
    BindProducts();
    $('#Txt_Price').val("");
    $('#Txtt_No').val("");
    $('#Txt_TPrice').val("");
    $('#Txt_Dis').val("");
    $('#Txt_DisN').val("");
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
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "width": 100, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeletePro(' + "'" + item.Position + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="Detailprod(' + "'" + item.Position + "'" + ');Editmodal()" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
                {
                    "data": "id", "title": "SNo.",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 'data': 'Position', 'title': 'Position', visible: false },
                { 'data': 'PId', 'title': 'Product ID' },
                { 'data': 'PName', 'title': 'Product Name' },
                { 'data': 'PQty', 'title': 'Quantity' },
                { 'data': 'Nou', 'title': 'UOM' },
                { 'data': 'PPrice', 'title': 'Product Price' },
/*                { 'data': 'Diso', 'title': 'Discount In Rs' },*/
                { 'data': 'DisoN', 'title': 'Discount In %' },
                { 'data': 'DiscAmt', 'title': 'Total Discount' },
                { 'data': 'TPrice', 'title': 'Total Price' },
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();
                nb_cols = api.columns().nodes().length;
                var j = 10;
      
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
                    debugger
                    $("#Txt_GPri").val(value).focus;
                    $("#Txt_DisAmt").val(value).focus;
                   /* Chgtaxes();*/
                }
            }
            
        }).buttons().container().appendTo('#tblQuotation_wrapper .col-md-6:eq(0)');
};

var DeletePro = function (Position) {
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
            DeleteProduct(Position);
        }
    });
};

var DeleteProduct = function (Position) {
    var Qid = $("#QuotId").val()
    var model = {
        QuotId: Qid,
        Position: Position
    };
    $.ajax({
        url: "/Customers/DeleteProduct",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (model) {
            getList(Qid);
            toastr.success('Product Deleted!');
            gettaxes();
        }
    });
};

var Detailprod = function (Position) {
    
    var Qid = $("#QuotId").val()
    var model = {
        QuotId: Qid,
        Position: Position
    };
    $.ajax({
        url: "/Customers/Details",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (model) {
            if (model != null) {
                
                $("#edtname").val(model[0].PName);
                $("#postion").val(model[0].Position);
                $("#No").val(model[0].PQty);
                $("#Price").val(model[0].PPrice);
                $("#TPrice").val(model[0].TPrice);
                $("#id").val(model[0].ProdId);
                return model;
            }
            else {
                return false;
            }
            return response;

        }
    });
};

var EditP = function () {
    
    var quotId = $("#QuotId").val()
    var postion = $("#postion").val()
    var noofunits = $("#No").val();
    var price = $("#TPrice").val();
    if ($("#DisP").val() != "")
        var discprice = $("#DisP").val();
    else
        var discprice = $("#TPrice").val();
    if ($("#Dis").val() != "")
        var diso = $("#Dis").val();
    else
        var diso = 0;
    if ($("#DisN").val() != "")
        var disoN = $("#DisN").val();
    else
        var disoN = 0;
    var dis = Number($("#TPrice").val()) - Number($("#DisP").val());
    var model = {
        QuotId: quotId,
        Postion: postion,
        No: noofunits,
        Discprice: discprice,
        price: price,
        Diso: diso,
        DisoN: disoN,
        dis: dis,
    };

    $.ajax({
        url: "../Customers/Editproduct ",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            
            console.log(response);
            var QuotId = $("#QuotId").val();
            getList(QuotId);
            $('#Editmodal').modal('hide');
            /*Editdata();*/
            $('#Dis').val('');
            $('#DisN').val('');
            $('#DisP').val('');
            gettaxes();
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    });
};

function Editmodal() {
    $("#Editmodal").modal('show');
};

function CheckValidPhoneno() {
    var txtCustPhon = "";
    var txtCustPhon = $("#t_cmob").val()
    var ValidPhoneno = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (txtCustPhon != '') {
        if (txtCustPhon.match(ValidPhoneno)) {
            CheckCust();
            return true;
        }
        else {
            toastr.error('Enter valid phone no.');
            $("#Txtt_cmob").val('');
            $("#Txtt_cmob").focus();
            return false;
        }
    }
}


function CheckEmail() {
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
            $("#btn-sa-confirm1").attr("disabled", false);
            return false;
        }
    }
}

var FinalQuot = function (QuotId) {
    

    if ($("#QuotId").val() != "") {
        var quotId = $("#QuotId").val();
    }
    else {
        toastr.error('Quotation Id Not Found');
        return false;
    }

    if ($("#ddlTaxes option:selected").val() != 0) {
        var taxes = $("#ddlTaxes option:selected").val();
    }
    else {
        toastr.error('Select Taxes');
        $("#ddlTaxes").focus();
        return false;
    }
    if ($("#Txt_GPri").val() == "0.00") {
        toastr.error('Select Product');
        return false;
    }
    else {
        var totalprice = $("#Txt_GPri").val();
    }
    debugger
    let b = $("#Txt_FPrice1").val();
    let a = $("#Txtt_adva").val();
    if (Math.round(a) > Math.round(b)) {
        debugger
        toastr.error('Advance cannot be more than Balance');
        return false;
    }
    else {
        
    }

    var advance = $("#Txtt_adva").val();
    var balance = $("#Txtt_bala").val();
    

    var taxesinno = $('#Txt_TPrice1').val();
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
    var disamt = $("#Txt_totaltax").val();
    var ttax = $("#Txt_totaltax").val();
    var gamt = $("#Txt_Price").val();
    var discamt = $("#Txt_netamount").val();
    var netamt = $("#Txt_DisP").val();

    if ($("#Txttrasport").val() != "") {
        var transport = $("#Txttrasport").val();
    }
    else {
        var transport = $("#Txttrasport").val("0");
    }

    if ($("#TxtInstall").val() != "") {
        var intsall = $("#TxtInstall").val();
    }
    else {
        var intsall = $("#TxtInstall").val("0");
    }
    if ($("#Txtt_adva").val() == "") {
        var advance = $("#Txtt_adva").val("0");
    }
    else {
        var advance = $("#Txtt_adva").val();
    }
    var discount = $("#Txt_DisAmt").val();
    var tprice = $("#Txt_FPrice1").val();

    var data = {
        QuotId: quotId,
        Advance: advance,
        Balance: balance,
        TotalPrice: totalprice,
        TTax: ttax,
        GAmt: gamt,
        DiscAmt: discamt,
        NetAmt: netamt,
        Taxes: taxes,
        Taxesinno: taxesinno,
        TaxCode: taxescode,
        CGST: cgst,
        SGST: sgst,
        IGST: igst,
        Transport: transport,
        Intsall: intsall,
        DiscountPrice: discount,
        Tprice: tprice,
    };
    $.ajax({
        url: "../Customers/FinalQuotation",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            var QuotId = response.model;
            (response.model == QuotId);
            $("#QuotId").val(QuotId);
            pageRedirect(QuotId);
        },
        error: function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    })
};

function pageRedirect(QuotId, CustId) {
    
    var QId = QuotId;
    window.location.href = "/Customers/Quot?QuotId=" + QuotId;   
    $("#QuotId").val(QId);
}
