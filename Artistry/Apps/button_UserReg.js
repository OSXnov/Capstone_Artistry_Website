function submitForm() {
    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);
//CLient-side code Front-End
    // Convert FormData to JSON object 
    const artistData = {
        first_name: formData.get('fname'),
        last_name: formData.get('lname'),
        user_name: formData.get('uname'),
        email: formData.get('email'), 
        password: formData.get('pwd'),
        age: formData.get('age')
    }; 

    fetch('http://localhost:5500/register', {
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
        console.log(data);
        if (data == 'User registered and Files copied successfully') {
            console.log('Redirecting to UserProfilePage.html');
            window.location.href = `/Artistry/DummyDB/Users/${artistData.user_name}/UserProfilePage.html`;
            
        } else {
            console.error('Registration failed:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
