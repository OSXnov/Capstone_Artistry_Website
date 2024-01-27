function submitForm() {
    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);

    // Convert FormData to URLSearchParams
    const urlSearchParams = new URLSearchParams(formData);
 
    fetch('http://localhost:5500/register', {
        method: 'POST',
        body: urlSearchParams,
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
        console.log(data);

        // Check if the response indicates successful registration
        if (data === 'User registered successfully') {
            // Redirect to another HTML page
            window.location.href = 'another_page.html';
        } else {
            // Handle other cases as needed
            // For example, display an error message
            console.error('Registration failed:', data);
        }
    }) 
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}
