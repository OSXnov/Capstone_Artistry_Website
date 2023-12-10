function submitForm() {
    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);

    fetch('http://localhost:5500/register', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Display success message or handle as needed
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}
