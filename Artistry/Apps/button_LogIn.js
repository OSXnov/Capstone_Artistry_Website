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
        console.log(data); // Display success message or handle as needed

        // Check if login was successful (you might need to adjust this based on your actual server response)
        if (data.message === 'Login successful') {
            // Redirect to the ProfilePage.html
            window.location.href = '/Artistry/UserProfilePage.html';
        } else {
            // Handle other cases if needed
        }
    }) 
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
        // You might also want to display an error message to the user
        document.getElementById("errorMessage").innerText = "An error occurred. Please try again.";
    });
}