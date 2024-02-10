function uploadArt() {
    console.log('uploadArt function called');
    const fileInput = document.getElementById('myFile');
    const files = fileInput.files;

    if (files.length === 0) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('files', file);
        saveImageToDirectory(file);
    }

    // Here you can send the formData to your server using fetch or XMLHttpRequest
    // Example using fetch:
    /*
    fetch('http://localhost:5500/uploadArt', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Files uploaded successfully');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error uploading files');
    });
    */
}

function saveImageToDirectory(file) {
    const reader = new FileReader();
    reader.onload = function() {
        const imgDataUrl = reader.result;
        const img = new Image();
        img.src = imgDataUrl;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg');
            const imageData = atob(dataUrl.split(',')[1]);
            const arrayBuffer = new ArrayBuffer(imageData.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < imageData.length; i++) {
                uint8Array[i] = imageData.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            const xhr = new XMLHttpRequest();
            xhr.open('POST', './art_exhibit', true);
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            xhr.send(blob);
        };
    };
    reader.readAsDataURL(file);
}

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('previewImg');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
