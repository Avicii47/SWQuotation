$(document).ready(function () {
    ProductDetails();

});

function ProductDetails() {
   
    var ID = '@Session["userId"].ToString()';
    let url = "../Product/ProductDetails";
    $.ajax({
        type: "POST",
        url: url,
        data: '{userid:"' + ProductId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
           
            if (response != null) {
                $("#ProductId").val(response[0].ProductId);
                $("#Txt_Prod").val(response[0].ProductName);
                $("#cat").val(response[0].ProductCatogery);
                $("#ddlUOM1").val(response[0].UOM);
                $("#Txt_Ht").val(response[0].Height);
                $("#Txt_Wdt").val(response[0].Width);
                $("#Txt_Dpt").val(response[0].Depth);
                $("#Txt_Th").val(response[0].Thickness);
                $("#Txt_PCol").val(response[0].colour);
                $("#Txt_Price").val(response[0].ProductPrice);

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