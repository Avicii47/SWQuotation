$(document).ready(function () {
    UserDetails(loginid);
})

function UserDetails(loginid) {
    
    let url = "../Login/Userdetail";

    $.ajax({
        type: "POST",
        url: url,
        data: '{t_cmob:"' + loginid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response != null) {
                $("#UserName").val(response[0].UserName).focus;
                $("#Img").val(response[0].fileName).focus;
                return response;
            }
            else {
                return false;
            }
            return response;
            UserDetails2(loginid);
        },
    });
}

function UserDetails2(loginid) {
    
    let url = "../Login/Userdetail2";

    $.ajax({
        type: "POST",
        url: url,
        data: '{t_cmob:"' + loginid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            return response;
        },
    });
}