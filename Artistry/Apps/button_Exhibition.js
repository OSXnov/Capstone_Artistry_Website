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
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 'success') {
            console.log('Redirecting to Exhibition Page');
            window.location.href = `/Artistry/DummyDB/Exhibition/${exhibitionData.username}/FileUpload.html`;
        } else {
            console.error('Redirection Failed', data.message);
        }
    })
    
}