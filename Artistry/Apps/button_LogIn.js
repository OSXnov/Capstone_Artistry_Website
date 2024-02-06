function LogInForm() {
    console.log('Login button clicked');
    const form = document.getElementById("LogInForm");
    const formData = new FormData(form);

    const urlSearchParams = new URLSearchParams(formData);

    
    // Log form data for debugging
    const artistData = {
        username: formData.get('uname'),
        password: formData.get('pwd'),

    };



    fetch('http://localhost:5500/login', {
        method: 'POST',
        body: JSON.stringify(artistData),
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
        console.log(data); // Display success message or handle as needed

        // Check if login was successful
        if (data === 'Login successful') {
            window.location.href = `./DummyDB/Users/${artistData.username}/UserProfilePage.html`;
        } else {
            // Handle other cases if needed
        }
    }) 
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}