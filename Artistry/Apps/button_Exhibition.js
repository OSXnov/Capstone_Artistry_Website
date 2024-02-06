function submitExhibitionForm() {
    const form = document.getElementById("exhibitionForm");
    const formData = new FormData(form);
 
    // Convert FormData to JSON object 
    const exhibitionData = {
        uname: formData.get('uname'),
        pwd: formData.get('pwd'),
        toa: formData.get('toa'),
        briefDesc: formData.get('briefDesc'),
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
        console.log(data);
        // Handle response as needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
