function submitExhibitionForm() {
    const form = document.getElementById("exhibitionForm");
    const formData = new FormData(form);
 
    // Convert FormData to JSON object 
    const exhibitionData = {
        username: formData.get('uname'),
        password: formData.get('pwd'),
        Title: formData.get('title'),
        briefdesc: formData.get('briefdesc'),
        category: formData.get('category')
    };

    fetch('http://localhost:5500/submitExhibition', {
        method: 'POST',
        body: JSON.stringify(exhibitionData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    }) 
    .then(data => {
        console.log(data)
        if(data == 'Files copied successfully'){
            console.log('Redirecting to Exhibition Page')
            window.location.href = `/Artistry/DummyDB/Exhibition/${exhibitionData.username}/FileUpload.html`;
        } else{
            console.error('Redirection Failed', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function uploadArt() {
    document.getElementById('fileUploadForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost:5500/uploadFiles', { // Update the endpoint to handle multiple files
            method: 'POST',
            body: formData,
        })
        .then(response => response.json()) // Response will be an array of file names
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

    document.getElementById('myFiles').addEventListener('change', function () { // Update to handle multiple files
        var fileNames = Array.from(this.files).map(file => file.name).join(', '); // Get names of selected files
        document.getElementById('file-names').textContent = fileNames || "No files chosen";
    });
}
