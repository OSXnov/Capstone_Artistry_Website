function LogIn() {
    const form = document.getElementById("LogInForm");
    const formData = new FormData(form);

    // Convert FormData to URLSearchParams
    const urlSearchParams = new URLSearchParams(formData);
 
    fetch('http://localhost:5500/forgot-password' ,{
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
    }) 
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}
