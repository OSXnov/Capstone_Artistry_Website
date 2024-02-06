const express = require('express');
const Artist = require('./Artist');
const Exhibition = require('./Exhibition');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra'); // Import the fs module
const path = require('path');

const app = express();
const port = 5500;

app.use(cors()); 
app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON data


// MYSQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'STT_ArtistryUserReg_2023',
  database: 'artistry',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve JavaScript files from the 'Apps' directory with correct MIME type
app.use('/Apps', express.static(path.join(__dirname, 'Apps')));

// Handle user registration and file operations
app.post('/register', (req, res) => {
  console.log('Request body:', req.body);
  const { first_name, last_name, user_name, email, password, age } = req.body;

  const artist = new Artist(first_name, last_name, user_name, email, password, age);

  // Insert data into the database
  const query = 'INSERT INTO users (first_name, last_name, age, email, username, password) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [artist.firstname, artist.lastname, artist.age, artist.email, artist.username, artist.password], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('');

      // Task 1: Locate a folder at a specific path
      const sourceFolderPath = 'C:\\Users\\ricar\\Documents\\Artistry\\Capstone_Artistry_Website\\Artistry\\BaseData\\UserBaseData\\';
      const destinationFolderPath = `C:\\Users\\ricar\\Documents\\Artistry\\Capstone_Artistry_Website\\Artistry\\DummyDB\\Users\\${user_name}`;

      // Create user directory
      fs.mkdir(destinationFolderPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating folder:', err);
          res.status(500).send('Error creating folder');
          return;
        }

        // Copy the entire source folder and its contents to the destination folder
        fs.copy(sourceFolderPath, destinationFolderPath, (err) => {
          if (err) {
            console.error('Error copying files:', err);
            res.status(500).send('Error copying files');
            return;
          }
          console.log('');

                  // Read UserProfilePage.html file
        fs.readFile(path.join(destinationFolderPath, 'UserProfilePage.html'), 'utf8', (err, data) => {
          if (err) {
              console.error('Error reading file:', err);
              return res.status(500).send('Error reading file');
          }

          // Replace placeholder values with user data
          const userProfileData = data.replace('{User.User_name}', artist.username);
          // You can add more replacements for other user data here

          // Save the modified file
          fs.writeFile(path.join(destinationFolderPath, 'UserProfilePage.html'), userProfileData, (err) => {
              if (err) {
                  console.error('Error saving file:', err);
                  return res.status(500).send('Error saving file');
              }
              console.log('User registered and Files copied successfully');
              res.status(200).send('User registered and Files copied successfully');
          });
        });
        });
      });
    }
  });
});

// A route to handle Exhibition form submission
app.post('/submitExhibition', (req, res) => {
  // Extract form data
  const { uname, pwd, toa, briefDesc, category } = req.body;

  // Validate user credentials (e.g., username and password)
  // Perform authentication here (omitted for brevity)

  // Instantiate Exhibition object
  const exhibition = new Exhibition(toa, briefDesc, uname, category);

  // Connect to MySQL and save data to database
  const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'STT_ArtistryUserReg_2023',
      database: 'artistry',
  });

  connection.connect();
  
  const query = 'INSERT INTO exhibition (Title, briefdesc, user_name, category) VALUES (?, ?, ?, ?)';
  connection.query(query, [exhibition.title, exhibition.briefdesc, exhibition.username, exhibition.category], (error, results, fields) => {
      if (error) {
          console.error('Error inserting data:', error);
          res.status(500).send('Internal Server Error');
      } else {
          console.log('Exhibition data inserted successfully');
          res.status(200).send('Exhibition data inserted successfully');
      }
  });

  connection.end();
});


app.post('/login', (req, res) => {
  console.log('Request body:', req.body);
  
  // Parse the request body JSON string
  const bodyData = JSON.parse(Object.keys(req.body)[0]);

  const { user_name, password } = bodyData;

  // Validate if the directory exists for the provided username
  const userDirectoryPath = path.join(__dirname, 'DummyDB', 'user_data', user_name);
  fs.access(userDirectoryPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Error accessing directory:', err);
      return res.status(401).send('Invalid username');
    }

    // If the directory exists, validate the password against the database
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [user_name, password], (err, results) => {
      if (err) {
        console.error('Error validating login:', err);
        return res.status(500).send('Internal Server Error');
      } else {
        console.log('Query results:', results); // Add this line to check query results
        if (results.length > 0) {
          console.log('Login successful');
          return res.status(200).send('Login successful');
        } else {
          console.log('Invalid username or password');
          return res.status(401).send('Invalid username or password');
        }
      }
    });
  });
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
