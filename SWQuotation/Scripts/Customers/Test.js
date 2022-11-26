//Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
var previewNode = document.querySelector("#template")
previewNode.id = ""
var previewTemplate = previewNode.parentNode.innerHTML
previewNode.parentNode.removeChild(previewNode)
debugger
var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
    url: "/Product/Addimg",// Set the url
    uploadMultiple: true,
    maxFiles: 3,
    maxFilesize: 3.0,
    thumbnailWidth: 80,
    thumbnailHeight: 80,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoProcessQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: "#previews", // Define the container to display the previews
    clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
})
debugger


myDropzone.on("addedfile", function (file) {
    // hookup the start button
    debugger

    debugger

    var photo = file;// attach dropzone image element

    console.log(photo)

    debugger
})

// Update the total progress bar
myDropzone.on("totaluploadprogress", function (progress) {
    document.querySelector("#total-progress .progress-bar").style.width = progress + "%"
})

myDropzone.on("sending", function (file) {
    // Show the total progress bar when upload starts
    document.querySelector("#total-progress").style.opacity = "1"
    // And disable the start button
    file.previewElement.querySelector(".start").setAttribute("disabled", "disabled")
})

// Hide the total progress bar when nothing's uploading anymore
myDropzone.on("queuecomplete", function (progress) {
    document.querySelector("#total-progress").style.opacity = "0"
})

// Setup the buttons for all transfers
// The "add files" button doesn't need to be setup because the config
// `clickable` has already been specified.
//document.querySelector(".post .start").onclick = function () {
//    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED))
//}
document.querySelector("#actions .cancel").onclick = function () {
    myDropzone.removeAllFiles(true)
}

// submit button configuration
debugger
//function getValues() {
//    debugger


//    debugger




//    return formData;
//}

var saveProduct = function () {
    debugger
    var Photo = myDropzone.files;
    console.log(photo);
    var message = "";
    $formData = new FormData();
    debugger

    //var Photo = document.getElementById('FileUpload');
    //var Photo = myDropzone.files;
    debugger
    if (Photo.length > 0) {
        for (var i = 0; i < Photo.length; i++) {
            $formData.append('file-' + i, Photo.files[i]);
        }
    }
    debugger
    var productname = $("#txtproduct").val();
    var productcatogery = $("#ddlcatogery option:selected").html();
    var productcolour = $("#txtcolour").val();
    var productprice = $("#txtprice").val();

    $formData.append('ProductName', productname);
    $formData.append('ProductCatogery', productcatogery);
    $formData.append('PC', productcolour);
    $formData.append('ProductPrice', productprice);

    $.ajax({
        url: "/Product/SaveProduct",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("Success");
            getProductList();
        }
    });
}
//myDropzone.element.querySelector("#submit").addEventListener("click", function (e) {
//    debugger
//    // make sure that the form isn't actually being sent.
//    e.preventDefault();
//    e.stopPropagation();


//    debugger
//    var photo = myDropzone.files;
//    console.log(photo);
//    var formData = new FormData();
//    // these image appends are getting dropzones instances
//    formData.append("productid", $("#prodId").val()); // regular text form attachment
//    formData.append("imgname", $("#imgName").val());// regular text form attachment

//    formData.append("file", photo)

//    if (photo.length > 0) {
//        for (var i = 0; i < photo.length; i++) {
//            formData.append("file" + i, photo[i]);
//        }
//    }
//    for (var pair of formData.entries()) {
//        console.log(pair[0] + ', ' + pair[1]);
//    }
//    //display formData

//    $.ajax({
//        type: 'POST',
//        url: "/Product/Addimg",
//        data: formData,
//        processData: false, // required for formdata with jquery
//        contentType: false, // required for formdata with jquery
//        success: function (response) {
//            console.log(response)
//        }
//    });

//});