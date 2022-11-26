$(document).ready(function () {
    BindRole();
});


var AddUser = function () {
    debugger
    var username = $("#UserName").val();
    var mob = $("#MobNo").val();
    var id = $("#UserId").val();
    var password = $("#Password").val();
    var role = $("#ddlrole").val();
    

    var data = {
        Username: username,
        Mob: mob,
        Id: id,
        Password: password,
        Role: role,
    };

    $.ajax({
        url: "../Home/AddUser",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (model) {
            debugger
            if (model.model == '0') {
               Swal.fire({
                   icon: 'success',
                    title: 'User Added',
                    
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Cannot add this User',
                    text: 'UserName is Taken!'
                });
            }
            clearfunction();
        }
    })
};

var clearfunction = function () {
    $('#UserName').val("");
    $('#MobNo').val("");
    $('#UserId').val("");
    $('#Password').val("");
    $('#ddlrole').val("");
}

function BindRole() {
    let url = "../Home/GetRole";
    $.ajax({
        type: "POST",
        url: url,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#ddlrole").empty();
                $("#ddlrole").append($("<option></option>").val("0").html("Select Role"));
                $.each(response, function (data, value) {
                    $("#ddlrole").append($("<option></option>").val(value.Role).html(value.Role));
                });
            }
            else {
                $("#ddlrole").empty();
                $("#ddlrole").append($("<option disabled></option>").val(0).html("Select Role"));
            }
            return $("#ddlrole option:selected").text();
        },
        failure: function (response) {
            alert(response.responseText);
            alert("Failure");
        },
    });
}

function CheckValidPhoneno() {

    var txtCustPhon = "";
    var txtCustPhon = $("#MobNo").val()
    var ValidPhoneno = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (txtCustPhon != '') {

        if (txtCustPhon.match(ValidPhoneno)) {
            CheckCust();
            return true;
            //CheckCust();
        }
        else {
            toastr.error('Enter valid phone no.');
            $("#MobNo").val('');
            return false;
        }
    }
}