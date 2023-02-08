$(document).ready(function () {
    var url = window.location.href;
    var split = url.split("EditQuot=");
    var currentURL = split[1];
    var QuotId = currentURL;
    BindCountry();
    BindECountry();
    BindCountrys();
    BindProducts();
    BindTaxes();
    Details(QuotId);
    GetbillAdd();
    GetshipAdd();
});


function Modal() {
    $("#myModal").modal('show');
};

function Modal2() {
    $("#minmax-modal-1").modal('show');
};

function Editaddmodal() {
    $("#EditAddress").modal('show');
    BindEState();
};

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
            debugger
            if (response != null) {
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

var addtoliner = function (quotId) {
    debugger
    if ($("#Txt_DisP").val() == 0) {
        toastr.error('Please select all field');
        return false;
    }
    else {
        var finalprice = $('#Txt_DisP').val();
    };
    if ($("#Txtt_No").val() != "") {
        var noofunits = $('#Txtt_No').val();
    }
    else {
        toastr.error('Select no. of Units');
        $("#ddlproduct option:selected").focus();
        return false;
    };
    var quotId = $("#QuotId").val();
    var productid = $("#ddlproduct option:selected").val();
    if ($("#ddlproduct option:selected").val() == 0) {
        toastr.error('Please select Product');
        $("#ddlproduct option:selected").focus();
        return false;
    }
    else {
        var finalprice = $('#Txt_DisP').val();
    };
    var product = $("#ddlproduct option:selected").html();
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
    
    var tax = $('#Txt_TPrice1').val();

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
        success: function (modal) {
            debugger
            toastr.success('Product Added');
            $('#AddModal').modal('toggle');
            QuotId = $("#QuotId").val();
            clearfunction();
            addedProdlist(QuotId);
            editProduct();
        },
        error: function (modal) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: modal,
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

var addAddress = function () {
    debugger
    if ($("#Txtname").val() != "") {
        var name = $("#Txtname").val();
    }
    else {
        toastr.error('Please enter Customer details first');
        return false;
    };
    if ($("#Txtt_cadd").val() != "") {
        var address = $("#Txtt_cadd").val();
    }
    else {
        toastr.error('Please enter Address');
        $("#Txtt_cadd").focus()
        return false;
    };
    if ($("#Txtt_cadd").val() != "") {
        var address = $("#Txtt_cadd").val();
    }
    else {
        toastr.error('Please enter Address');
        $("#Txtt_cadd").focus()
        return false;
    };
    if ($("#Txtt_cadd").val() != "") {
        var address = $("#Txtt_cadd").val();
    }
    else {
        toastr.error('Please enter Address');
        $("#Txtt_cadd").focus()
        return false;
    };
    if ($("#Txtt_cadd").val() != "") {
        var address = $("#Txtt_cadd").val();
    }
    else {
        toastr.error('Please enter Address');
        $("#Txtt_cadd").focus();
        return false;
    };
    if ($("#Txtt_cadd").val() != "") {
        var pincode = $("#TxtPincode").val();
    }
    else {
        toastr.error('Please enter Pincode');
        $("#Txtt_cadd").focus();
        return false;
    };
    if ($("#Txtt_cadd2").val()!= "") {
        var address2 = $("#Txtt_cadd2").val();
    }
    else {
        toastr.error('Please enter Pincode');
        $("#Txtt_cadd2").focus();
        return false;
    };
    if ($("#Txtt_cadd2").val() != "") {
        var address3 = $("#Txtt_cadd2").val();
    }
    else {
        toastr.error('Please enter Pincode');
        $("#Txtt_cadd2").focus();
        return false;
    };
    if ($("#TxtLandmark").val() != "") {
        var landmark = $("#TxtLandmark").val();
    }
    else {
        toastr.error('Please enter landmark');
        $("#TxtLandmark").val();
        return false;
    };

    if ($("#ddlCity option:selected").val() == "") {
        toastr.error('Please enter City');
        return false;
    }
    else {
        var city = $("#ddlCity option:selected").html();
    };

    if ($("#Txtt_dist").val() != "") {
        var district = $("#Txtt_dist").val();
    }
    else {
        toastr.error('Please enter District');
        $("#Txtt_dist").val();
        return false;
    };
    if ($("#ddlStates option:selected") == "") {
        toastr.error('Please enter State');
        return false;
    }
    else {
        var state = $("#ddlStates option:selected").html();
    };
    if ($("#ddlcountry option:selected").val() == "") {
        toastr.error('Please enter Country');
        return false;
    }
    else {
        var country = $("#ddlcountry option:selected").html();
    };

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
        success: function (modal) {
            //Swal.fire({
            //    icon: 'success',
            //    title: 'Customer Address Added',
            //});
            toastr.success('Customer Address Added');
            getAddress();
            getAddress1();
            $("#myModal2").modal('show');
            $("#BillAddress").focus();
            closeadd();
        },
        error: function (modal) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: modal,
            });
            closeadd();
        }
    })
};

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
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "width": 100, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteP(' + "'" + item.Position + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
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
                /*{ 'data': 'PId', 'title': 'Position', visible: false },*/
                { 'data': 'PName', 'title': 'Product Name' },
                { 'data': 'Nou', 'title': 'Units' },
                { 'data': 'PQty', 'title': 'Quantity' },
                
                { 'data': 'PPrice', 'title': 'Per Product Price' },
                { 'data': 'TPrice', 'title': 'Discounted Price' },
               
                
            ],
            "footerCallback": function (row, data, start, end, display) {
                debugger
                var api = this.api();
                nb_cols = api.columns().nodes().length;
                var j = 7;
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
                    editProduct();
                }
            }

        }).buttons().container().appendTo('#tblQuotation_wrapper .col-md-6:eq(0)');
};

var DeleteP = function (Position) {
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

function Editmodal() {
    debugger
    $("#Editmodal").modal('show');
};

function getAddress() {
    var custid = $('#Txtname').val();
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
    var datatableVariable = $("#tblShip").DataTable(
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
                        return '<center><div class="btn-group"><button type="button" onclick="GetCode1(' + "'" + item.AddressCode + "'" + ')" value="0" data-dismiss="modal" class="btn btn-secondary btn-sm" id="btn-sa-confirm"><i class="fas fa-plus-circle"></i></button></div></center>'
                    },
                },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteA(' + "'" + item.AddressCode + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="AddressDetails(' + "'" + item.AddressCode + "'" + ');Editaddmodal();BindEState();" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>'
                    },
                },
                { 'data': 'AddressCode', 'title': 'Address Code'/*, "visible": false*/ },
                { 'data': 't_cnam', 'title': 'Customer Name' },
                { 'data': 't_cadd', 'title': 'Address 1' },
                { 'data': 'Address2', 'title': 'Address 2' },
                { 'data': 'Address3', 'title': 'Address 3' },
                { 'data': 'City', 'title': 'City' },
                { 'data': 'District', 'title': 'District' },
                { 'data': 'State', 'title': 'State' },
                { 'data': 'Country', 'title': 'Country' },
                { 'data': 'Pincode', 'title': 'Pincode' },

            ]
        }).buttons().container().appendTo('#tblShip_wrapper .col-md-6:eq(0)');
};

function getAddress1() {
    var custid = $('#Txtname').val();
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
    var datatableVariable = $("#tblBill").DataTable(
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
                        return '<center><div class="btn-group"><button type="button" onclick="GetCode(' + "'" + item.AddressCode + "'" + ')" value="0" data-dismiss="modal" class="btn btn-secondary btn-sm" id="btn-sa-confirm"><i class="fas fa-plus-circle"></i></button></div></center>'
                    },
                },
                {
                    'data': null, title: 'Delete/Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteA(' + "'" + item.AddressCode + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="nav-icon fas fa-trash"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="AddressDetails(' + "'" + item.AddressCode + "'" + ');Editaddmodal()" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit"></i></button></div></center>' 
                    },
                },
                { 'data': 'AddressCode', 'title': 'Address Code'/*, "visible": false*/ },
                { 'data': 't_cnam', 'title': 'Customer Name' },
                { 'data': 't_cadd', 'title': 'Address 1' },
                { 'data': 'Address2', 'title': 'Address 2' },
                { 'data': 'Address3', 'title': 'Address 3' },
                { 'data': 'City', 'title': 'City' },
                { 'data': 'District', 'title': 'District' },
                { 'data': 'State', 'title': 'State' },
                { 'data': 'Country', 'title': 'Country' },
                { 'data': 'Pincode', 'title': 'Pincode' },

            ]
        }).buttons().container().appendTo('#tblBill_wrapper .col-md-6:eq(0)');
};

var DeleteA = function (AddressCode) {
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
            DeleteADD(AddressCode);
        }
    });
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
            debugger
            if (model.model == '0') {
                Swal.fire({
                    icon: "warning",
                    title: 'Address Is Added In Quotation',
                });
                getAddress1();
                getAddress();
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Address Deleted',
                });
            }
        }
    });
};

function AddressDetails(AddressCode) {
    debugger
    let url = "../Customers/AddressDetails";
    $.ajax({
        type: "POST",
        url: url,
        data: '{AddressCode:"' + AddressCode + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger
            if (response != null) {
                $("#Acode").val(response[0].AddressCode);
                $("#Aname").val(response[0].t_cnam);
                $("#AAdd1").val(response[0].address);
                $("#AAdd2").val(response[0].Address2);
                $("#AAdd3").val(response[0].Address3);
                $("#ddlEcountry").val(response[0].Country);
                $("#ddlEStates").val(response[0].State);
                $("#ddlECity").val(response[0].City);
                $("#ADist").val(response[0].District);
                $("#APin").val(response[0].Pincode);
                BindECountry();
                BindEState();
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
            return $("#ddlEcountry option:selected").text();
            BindEState();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindEState() {
    debugger
    var countID = $('#ddlEcountry').val();
    let url = "../Customers/StateList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + countID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
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

function BindECity() {
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
                    $("#ddlECity").append($("<option></option>").val(value.City).html(value.City));
                });
            }
            else {
                $("#ddlECity").empty();
                $("#ddlECity").append($("<option disabled></option>").val(0).html("Select City"));
            }
            return $("#ddlECity option:selected").text();
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
    debugger
    var AddressCode= $("#ExtShip").val();
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
    debugger
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
            Details(Qid);
            toastr.success('Product Deleted');
        }
    });
};

var Detailprod = function (Position) {
    debugger
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
                debugger
                $("#edtname").val(model[0].PName);
                $("#postion").val(model[0].Position);
                $("#No").val(model[0].PQty);
                $("#Price").val(model[0].PPrice);
                $("#TPrice").val(model[0].TPrice);
                $("#id").val(model[0].ProdId);
                $("#Dis").val(model[0].Diso);
                $("#DisN").val(model[0].DisoN);
                $("#Txt_Disprice").val(model[0].FinalPrice);
                return model;

            }
            else {
                return false;
            }
            return response;
            
        }
    });
};

var Editdata = function () {
    debugger
    var quotId = $("#QuotId").val()
    var billto = document.getElementById("ExtBill").value;
    var shipto = document.getElementById("ExtShip").value;
    var taxes = $("#ddlTaxes option:selected").val();
    if ($('#ddlTaxes').val() != "") {
        var taxescode = 2;
    }

    //var taxescode = $('#ddlTaxes').val();
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
    var taxesinno = $('#Txt_TPrice1').val();
    if ($("#Txttrasport").val() != "") {
        var transport = $("#Txttrasport").val();
    }
    else {
        toastr.error('Enter Transport Cost');
        $("#Txttrasport").val('');
        $("#Txttrasport").focus();
        return false;
    }

    if ($("#TxtInstall").val() != "") {
        var intsall = $("#TxtInstall").val();
    }
    else {
        toastr.error('Enter Installation Cost');
        $("#TxtInstall").val('');
        $("#TxtInstall").focus();
        return false;
    }
    var discount = $("#Txt_DisAmt").val();
    var tprice = $("#Txt_FPrice1").val();
    var totalprice = $("#Txt_GPri").val();
    var advance = $("#Txtt_adva").val();
    var balance = $("#Txtt_bala").val();

    var model = {
        QuotId: quotId,   
        Advance: advance,
        Balance: balance,
        TotalPrice: totalprice,
        Tax: ttax,
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
        Billto: billto,
        Shipto: shipto,
    };

    $.ajax({
        url: "../Customers/EditQuot ",
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
                text: 'Customer Detail Changed'
            });
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

var Clearfunction = function () {
    debugger
    $('#edtname').val("");
    $('#Price').val("");
    $('#No').val("");
    $('#TPrice').val("");
    $('#Txt_Disprice').val("");
}

var EditADD = function () {
    debugger
    var add1 = $("#AAdd1").val()
    var add2 = $("#AAdd2").val();
    var add3 = $("#AAdd3").val();
    var country = document.getElementById("ddlEcountry").value;
    var state = document.getElementById("ddlEStates").value;
    var city = document.getElementById("ddlECity").value;
    var dist = $("#ADist").val();
    var pin = $("#APin").val();
   
    var model = {
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
            toastr.success('Changes Completed');
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

function BindState() {
    debugger
    var countID = $("#ddlcountry").val();
    let url = "../Customers/StateList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + countID + '"}',
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
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindCity() {
    debugger
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

function BindStates() {
    var countID = $("#ddlcountrys").val();
    let url = "../Customers/StateList";
    $.ajax({
        type: "POST",
        url: url,
        data: '{StateId:"' + countID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger
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
            //var City = $("#ddlStates option:selected").text();
            //BindCity(City);
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function BindCitys() {
    debugger
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
                    $("#ddlCitys").append($("<option></option>").val(value.City).html(value.City));
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

    });
}

function shipto() {
    getAddress();
    getAddress1();
    $('#myModal').modal('toggle');
    $("#ShipModal").modal('show');
};

function billto() {
    getAddress();
    getAddress1();
    $('#myModal').modal('toggle');
    $("#BillModal").modal('show');
};

function AddModal() {
    $('#myModal').modal('toggle');
    $("#AddModal").modal('show');
};

function AddAddressModal() {
    $('#myModal').modal('toggle');
    $("#AddModal").modal('show');
};

function AddNewAddress() {
    $('#myModal').modal('toggle');
    $('#billto').modal('toggle');
    $('#shipto').modal('toggle');
    $("#AddNewAddressModal").modal('show');
};

$(document).ready(function () {
    $("#Txt_Th,#Txttrasport,#TxtInstall").keyup(function () {
        let total = 0;
        var GP = Number($('#Ex').val());
        var trans = Number($('#Txttrasport').val());
        var install = Number($('#TxtInstall').val());
         total = GP + trans + install;
        $('#Txt_Th').val(total).focus;
        var adv = Number($('#Txtt_adva').val());
        var P = Number($('#Txt_Th').val());
        var B = P - adv;
        $('#Txtt_bala').val(B).focus;
    });
});

$(document).ready(function () {
    $("#Txt_Price,#Txtt_No").keyup(function () {
        debugger
        var total = 0;
        var x = Number($("#Txt_Price").val());
        var y = Number($("#Txtt_No").val());
        var total = x * y;
        $("#Txt_TPrice").val(total);
        $("#Txt_DisP").val(total);
    });
});

function ddltaxes() {
    $(function () {
        $("#ddlTaxes").on("change", function () {
            if (parseInt($("#ddlTaxes").val()) == 2) {
                $("#IGST").hide();
                $("#GST").show();

            } else {
                $("#IGST").show();
                $("#GST").hide();
            }
        });
        $("#ddlTaxes").trigger("change");
    });
};

$(document).on("change keyup blur", "#Txt_Dis", "#Txt_DisN", function () {
    var main = $('#Txt_TPrice').val();
    var disc = $('#Txt_Dis').val();
    var dec = (disc / 100).toFixed(2);
    var mult = main * dec;
    var discont = main - mult;
   /* document.getElementById("Txt_DisN").disabled = true;*/
    $('#Txt_DisP').val(discont);

    if (parseInt($("#Txt_Dis").val()) == "") {
        var disN = $('#Txt_DisN').val();
        var netprice = main - disN;
        $('#Txt_netamount').val(netprice);

    } else {
        var netprice = main - discont;
        $('#Txt_netamount').val(netprice);
    }
});

$(document).on("change keyup blur", "#Txt_DisN", function () {
    var main = $('#Txt_TPrice').val();
    var disN = $('#Txt_DisN').val();
    var netprice = main - disN;
    $('#Txt_netamount').val(netprice);
});

function editProduct() {
    var total = $("#Txt_GPri").val();
    var tax = $('#Txt_Tc').val();
    getGST(tax);
    editedTax(tax);
    var per = $('#TxtPER').val();
    var mult = per * total;
    var discont = (mult / 100);
    discont = parseFloat(discont).toFixed(2);
    var dis = (discont / 2);
    $('#Txt_TPrice1').val(discont);
    $('#Txt_CGST').val(dis);
    $('#Txt_SGST').val(dis);
    $('#Txt_IGST').val(discont);
    $('#Txt_totaltax').val(discont).focus;
    var t = Number($('#Txt_GPri').val());
    var tt = Number(discont);
    var totalprice = t + tt
    var value = parseFloat(totalprice).toFixed(2);
    $('#Txt_FPrice1').val(value).focus;
    $('#Ex').val(value).focus;
    $('#Txt_Th').val(value).focus;
    var total = 0;
    var p = Number($("#Txt_FPrice1").val());
    var q = Number($("#Txtt_adva").val());
    var to = p - q;
    var total = parseFloat(to).toFixed(2)
    $("#Txtt_bala").val(total);
    $("#bala").val(total);
    if ($("#Txtt_bala").val() < 0) {
        toastr.error('Value cannot be negitive');
        $("#Txtt_adva").focus();
    }
};

var addbillAddress = function () {
    if ($("#Txtname").val() != "") {
        var name = $("#Txtname").val();
    }
    else {
        var name = $("Txtname").val();
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
    if ($("#Txtt_dist").val() != "") {
        var district = $("#Txtt_dist").val();
    }
    else {
        toastr.error('Enter District');
        return false;
    }

    if ($("#TxtLandmark").val() != "") {
        var landmark = $("#TxtLandmark").val();
    }
    else {
        toastr.error('Enter Landmark');
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
            $("#AddbillAddress").modal('hide');
            $("#ShipModal").modal('hide');
            debugger
            GetbillCode(model);
        },
        error: function (AddressCode) {
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: response,
            });
        }
    })
};

var GetbillCode = function (model) {
    debugger
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
            debugger
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

var addshipAddress = function () {
    debugger
    if ($("#Txtname").val() != "") {
        var name = $("#Txtname").val();
    }
    else {
        var name = $("Txtname").val();
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
        toastr.error('Enter Address');
        return false;
    }

    if ($("#Txtt_cadd3s").val() != "") {
        var address3 = $("#Txtt_cadd3s").val();
    }
    else {
        toastr.error('Enter Address');
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
        toastr.error('Select States');
        return false;
    }
    else {

        var state = $("#ddlStatess option:selected").val();
    }

    if ($("#ddlCitys option:selected").val() == 0) {
        toastr.error('Select Citys');
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
    if ($("#TxtLandmarks").val() != "") {
        var landmark = $("#TxtLandmarks").val();
    }
    else {
        toastr.error('Enter Landmark');
        return false;
    }

    if ($("#Txtt_dists").val() != "") {
        var district = $("#Txtt_dists").val();
    }
    else {
        toastr.error('Enter District');
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
            //Swal.fire({
            //    icon: 'success',
            //    title: 'Address Added',
            //});
            toastr.success('Address Added');
            getAddress();
            $("#AddShipAddress").modal('hide');
            $("#ShipModal").modal('hide');
            GetsCode(response);
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

$(document).on("change keyup blur", "#Txt_DisN", function () {
    debugger
    var main = $('#Txt_TPrice').val();
    var disN = $('#Txt_DisN').val();
    var discont = main - disN;
    $('#Txt_DisP').val(discont);
});

function editedTax(tax) {
    if (tax == 2) {
        $("#IGST").hide();
        $("#GST").show();
    }else {
        $("#IGST").show();
        $("#GST").hide();
    }
}

var EditP = function () {
    debugger
    var quotId = $("#QuotId").val()
    var postion = $("#postion").val()
    /*var noofunits = $("#No").val();*/
    if ($("#No").val() == "0" || $("#No").val() == "") {
        toastr.error('Select no of units');
        $("#No").val();
        return false;
    }
    else
        var noofunits = $("#No").val();

    var price = $("#TPrice").val();
    if ($("#Txt_Disprice").val() != "")
        var discprice = $("#Txt_Disprice").val();
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
    var dis = $("#TPrice").val() - $("#Txt_Disprice").val();
    var model = {
        QuotId: quotId,
        Postion: postion,
        No: noofunits,
        Discprice: discprice,
        price:price,
        Diso: diso,
        DisoN: disoN,
        dis:dis,
    };

    $.ajax({
        url: "../Customers/Editproduct",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger
            toastr.success('Changes Complete');
            
            console.log(response);
            var QuotId = $("#QuotId").val();
            addedProdlist(QuotId);
            $('#Editmodal').modal('hide');
           
            Editdata();
            Clearfunction();
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
