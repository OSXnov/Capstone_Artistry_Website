const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5500;
 
app.use(cors());

// MYSQL connection
const connection = mysql.createConnection({
    host:  'localhost', 
    user:  'root',
    password: 'STT_ArtistryUserReg_2023',
    database: 'artistry',
  })
  

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err); //error handling
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your HTML)
app.use(express.static('public'));

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate login (use hashed passwords in a real application)
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
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

// // Sample route to render the dynamic user profile
// app.get('/profile/:username', (req, res) => {
//   const username = req.params.username;

//   connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
//     if (err) throw err;

//     if (results.length > 0) {
//       const user = results[0];
//       res.render('profile', {
//         userFullName: `${user.firstName} ${user.lastName}`,
//         userAboutMe: user.aboutMe,
//       });
//     } else {
//       res.send('User not found');
//     }
//   });
// });



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
