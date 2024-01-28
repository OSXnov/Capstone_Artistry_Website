const express = require('express');
const Artist = require('./Artist');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


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
app.use('/Apps', (req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  express.static(path.join(__dirname, 'Apps'))(req, res, next);
});
 
// Handle form submission (from the second application)
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
      console.log('User registered successfully');
      res.status(200).send('User registered successfully');
    }
  });
});

// Handle login (from the first application)
app.post('/login', (req, res) => {
  const { uname, pwd } = req.body;
 //console.log('Received login request:', { uname, pwd });

  // Validate login (use hashed passwords in a real application)
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [uname, pwd], (err, results) => {
    if (err) {
      console.error('Error validating login:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        console.log('Login successful');
        res.status(200).send('Login successful');
      } else {
        console.log('Invalid username or password');
        res.status(401).send('Invalid username or password');
      }
    }
  });
});

// Define a route to handle folder creation
app.get('/createFolder', (req, res) => {
  const { username } = req.query;

  // Define the path where the folder will be created
  const folderPath = `/DummyDB/user_data/${username}`;

  // Use Node.js's built-in fs module to create the folder
  const fs = require('fs');
  fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
          console.error('Error creating folder:', err);
          res.status(500).send('Error creating folder');
      } else {
          console.log('Folder created successfully');
          res.status(200).send('Folder created successfully');
      }
  });
});





// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
