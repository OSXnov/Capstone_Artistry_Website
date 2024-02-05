function LogInForm() {
    console.log('Login button clicked');
    const form = document.getElementById("LogInForm");
    const formData = new FormData(form);

    const urlSearchParams = new URLSearchParams(formData);

    
    // Log form data for debugging
    const artistData = {
        first_name: formData.get('fname'),
        last_name: formData.get('lname'),
        user_name: formData.get('uname'),
        email: formData.get('email'),
        password: formData.get('pwd'),
        age: formData.get('age')
    };



    fetch('http://localhost:5500/login', {
        method: 'POST',
        body: JSON.stringify(artistData),
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
            window.location.href = `./DummyDB/user_data/${artistData.user_name}/UserProfilePage.html`;
        } else {
            // Handle other cases if needed
        }
    }) 
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}