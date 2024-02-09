function uploadArt() {
    document.getElementById('fileUploadForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost:5500/uploadFile', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Files uploaded successfully');
            window.location.href = '/Artistry/Exhibition.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading files');
        });
    });

    // Event listener for file input change
    document.getElementById('myFiles').addEventListener('change', function () {
        var fileNames = Array.from(this.files).map(file => file.name).join(', ');
        document.getElementById('file-names').textContent = fileNames || "No files chosen";
    });
}
