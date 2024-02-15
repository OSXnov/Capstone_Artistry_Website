function uploadArt() {
    console.log('uploadArt function called');
    // Here you can handle the upload logic
    alert('File(s) uploaded successfully');
}

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('previewImg');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
