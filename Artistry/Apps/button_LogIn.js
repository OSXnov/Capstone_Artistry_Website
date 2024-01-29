function LogInForm() {
    console.log('Login button clicked');
    const form = document.getElementById("LogInForm");
    const formData = new FormData(form);
    // Log form data for debugging
    console.log('FormData:', formData);


    // Convert FormData to URLSearchParams
    const urlSearchParams = new URLSearchParams(formData);


    fetch('http://localhost:5500/login', {
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
        console.log(data); // Display success message or handle as needed

        // Check if login was successful
        if (data === 'Login successful') {
            
            // Redirect to another HTML file upon successful login
            window.location.href = '';
        } else {
            // Handle other cases if needed
        }
    }) 
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}