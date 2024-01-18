function LogIn() {
    const form = document.getElementById("LogInForm");
    const formData = new FormData(form);

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
        // Assuming your server sends a response indicating success or failure
        if (data === 'success') {
            // Redirect to SuccessPage.html on successful login
            window.location.href = "/Artistry/UserProfilePage.html";
        } else {
            // Display the error message on unsuccessful login
            document.getElementById("errorMessage").innerText = "Wrong credentials, please try again.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
        // You might also want to display an error message to the user
        document.getElementById("errorMessage").innerText = "An error occurred. Please try again.";
    });
}
