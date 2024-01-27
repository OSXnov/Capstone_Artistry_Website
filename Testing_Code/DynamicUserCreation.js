const mysql = require('mysql');
const fs = require('fs');

// Define the Artist class
class Artist {
  constructor(firstName, lastName, userName, email, password, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.age = age;
  }
}

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'artistry'
});

// Connect to MySQL database
connection.connect();

// Function to update HTML file with username
function updateHtmlFile(artist) {
  // SQL query to retrieve the username
  const query = `SELECT username FROM users WHERE email = '${Artist.email}';`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.error("Error occurred while retrieving username from database:", error);
      return;
    }

    // Retrieve the username from the query result
    const username = results[0].username;

    // Read the HTML file
    const htmlFilePath = '/Testing_Code/UserProfilePageTEST.html';
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Replace the placeholder with the retrieved username
    const modifiedHtmlContent = htmlContent.replace(/{Users.username}/g, username);

    // Write the modified HTML back to the file
    fs.writeFileSync(htmlFilePath, modifiedHtmlContent);

    console.log("Username replaced successfully.");
  });
}

// Create an instance of Artist
const emaMontano = new Artist('Ema', 'Montano', 'ema.montano10', 'ema.montano10@gmail.com', 'password123', 25);

// Call the function to update the HTML file with the artist's username
updateHtmlFile(emaMontano);

// Close MySQL connection after updating HTML file
connection.end();
