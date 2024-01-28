function onRegistrationSuccess(username) {
    // Task 1: Locate a folder at a specific path
    const sourceFolderPath = '/Artistry/UserRegBaseData/';
    const destinationFolderPath = `/Artistry/DummyDB/user_data/${username}`;
    const fs = require('fs-extra');
    
    // Copy the entire source folder and its contents to the destination folder
    fs.copy(sourceFolderPath, destinationFolderPath, (err) => {
        if (err) {
            console.error('Error copying files:', err);
            return;
        }
        console.log('Files copied successfully');
    
        // At this point, you can continue with other operations or send a response back to the client.
    });
    
    // Task 2: Copy every file and folder within the located folder
    // Task 3: Paste the copied files and folders to another folder path
    

    // Replace {Users.Username} placeholder in UserProfilePage.html with the extracted username value
    const placeholder = '{Users.Username}';
    const userProfilePagePath = '/Artistry/UserRegBaseData/UserProfilePage.html';

    // Read the contents of UserProfilePage.html and replace the placeholder with the username
    fetch(userProfilePagePath)
        .then(response => response.text())
        .then(data => {
            const modifiedData = data.replace(placeholder, username);

            // Create a folder named after the username value
            fetch(`http://localhost:5500/createFolder?username=${username}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to create folder');
                    }
                    return response.text();
                })
                .then(() => {
                    // Write the modified contents back to UserProfilePage.html
                    fetch(userProfilePagePath, {
                        method: 'PUT',
                        body: modifiedData,
                    })
                    .then(() => {
                        console.log('Tasks completed successfully');
                        // Redirect to another HTML page
                        window.location.href = `/DummyDB/user_data/${username}`;
                    })
                    .catch(error => {
                        console.error('Error writing to UserProfilePage.html:', error);
                    });
                })
                .catch(error => {
                    console.error('Error creating folder:', error);
                });
        })
        .catch(error => {
            console.error('Error reading UserProfilePage.html:', error);
        });
}


function submitForm() {
    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);

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
        if (data === 'User registered successfully') {
            onRegistrationSuccess(artistData.user_name);


        } else {
            console.error('Registration failed:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
