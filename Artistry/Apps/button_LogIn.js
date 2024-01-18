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
<<<<<<< HEAD
        // Assuming your server sends a response indicating success or failure
        if (data === 'success') {
            // Redirect to SuccessPage.html on successful login
            window.location.href = "/Artistry/UserProfilePage.html";
        } else {
            // Display the error message on unsuccessful login
            document.getElementById("errorMessage").innerText = "Wrong credentials, please try again.";
        }
    })
=======
        console.log(data); // Display success message or handle as needed

        // Check if login was successful (you might need to adjust this based on your actual server response)
        if (data.message === 'Login successful') {
            // Redirect to the ProfilePage.html
            window.location.href = '/Artistry/UserProfilePage.html';
        } else {
            // Handle other cases if needed
        }
    }) 
>>>>>>> 6cce3b38c76f82ecb7b4eb782d3fa6aa1b8e3368
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
        // You might also want to display an error message to the user
        document.getElementById("errorMessage").innerText = "An error occurred. Please try again.";
    });
}
