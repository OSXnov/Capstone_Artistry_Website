const express = require('express');
const Artist = require('./Artist');
const Exhibition = require('./Exhibition');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra'); // Import the fs module
const path = require('path');
const fileUpload = require("express-fileupload");
const session = require("express-session");


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

// Serve files from DummyDB directory
app.use('/Artistry/DummyDB', express.static(path.join(__dirname, 'DummyDB')));


const filesPayloadExists = require('./middleware/filePayloadExist');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));




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



app.post('/login', (req, res) => {
  console.log('Request body:', req.body);
  
  // Parse the request body JSON string
  const {username, password} = req.body;
  const artist = new Artist(null, null, username, null, password, null);

  // Validate if the directory exists for the provided username
  const userDirectoryPath = path.join(__dirname, 'DummyDB', 'Users', username);
  fs.access(userDirectoryPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Error accessing directory:', err);
      return res.status(401).send('Invalid username');
    }

    // If the directory exists, validate the password against the database
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [artist.username, artist.password], (err, results) => {
      if (err) {
        console.error('Error validating login:', err);
        return res.status(500).send('Internal Server Error');
      } 
      else {
        console.log('Query results:', results); // Add this line to check query results
        if (results.length > 0) {
          console.log('Login successful');
          return res.status(200).send('Login successful');
        } 
        else {
          console.log('Invalid username or password');
          return res.status(401).send('Invalid username or password');
        }
      }
    });
  });
});




app.post('/submitExhibition', (req, res) => {
  // Extract form data
  const { username, password, Title, briefdesc, category } = req.body;

  // Authenticate user
  const artist = new Artist(null, null, username, null, password, null); // Create Artist object with username and password

  // Store username in the session
  req.session.username = username;

  // Validate user credentials before proceeding
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [artist.username, artist.password], (err, results) => {
    if (err) {
      console.error('Error validating login:', err);
      return res.status(500).send('Internal Server Error');
    } else {
      console.log('Query results:', results);
      if (results.length > 0) {
        console.log('Login successful');

        // If login is successful, insert exhibition data
        const exhibit = new Exhibition(Title, briefdesc, username, category);
        const insertQuery = 'INSERT INTO exhibition (Title, briefdesc, username, category) VALUES (?, ?, ?, ?)';
        connection.query(insertQuery, [exhibit.Title, exhibit.briefdesc, exhibit.username, exhibit.category], (error, results, fields) => {
          if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Internal Server Error');
          } else {
            console.log('Exhibition data inserted successfully');

            // Create exhibition directory and copy files
            const sourceFolderPath = 'C:\\Users\\ricar\\Documents\\Artistry\\Capstone_Artistry_Website\\Artistry\\BaseData\\ExhibitionBaseData\\';
            const destinationFolderPath = `C:\\Users\\ricar\\Documents\\Artistry\\Capstone_Artistry_Website\\Artistry\\DummyDB\\Exhibition\\${username}`;

            // Write content to text file
            const middlewareFolderPath = 'C:\\Users\\ricar\\Documents\\Artistry\\Capstone_Artistry_Website\\Artistry\\middleware';
            const txtFilename = `${username}_path.txt`;
            const TXTfile = path.join(middlewareFolderPath, txtFilename);
            const txtContent = `C:\\Users\\ricar\\Documents\\Artistry\\Capstone_Artistry_Website\\Artistry\\DummyDB\\Exhibition\\${username}\\art-exhibit\\`;

            fs.mkdir(destinationFolderPath, { recursive: true }, (err) => {
              if (err) {
                console.error('Error creating folder:', err);
                res.status(500).send('Error creating folder');
              } else {
                // Create middleware directory if it doesn't exist
                fs.mkdir(middlewareFolderPath, { recursive: true }, (err) => {
                  if (err) {
                    console.error('Error creating middleware folder:', err);
                    res.status(500).send('Error creating middleware folder');
                  } else {
                    // Replace `${username}` with the actual username in the text content
                    const replacedTxtContent = txtContent.replace('${username}', username);

                    // Write content to text file
                    fs.writeFile(TXTfile, replacedTxtContent, (err) => {
                      if (err) {
                        console.error('Error writing to text file:', err);
                        res.status(500).send('Error writing to text file');
                      } else {
                        console.log('Text file created successfully');
                        // Copy files to destination folder
                        fs.copy(sourceFolderPath, destinationFolderPath)
                          .then(() => {
                            console.log('Files copied successfully');
                            res.status(200).send('Files copied successfully');
                          })
                          .catch((err) => {
                            console.error('Error copying files:', err);
                            res.status(500).send('Error copying files');
                          });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        console.log('Invalid username or password');
        return res.status(401).send('Invalid username or password');
      }
    }
  });
});


app.post('/uploadArt',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files;

        // Read the path from the text file in the middleware folder
        const middlewareFolderPath = 'C:\\Users\\ricar\\Documents\\Artistry\\Capstone_Artistry_Website\\Artistry\\middleware';
        fs.readdir(middlewareFolderPath, (err, filenames) => {
            if (err) {
                console.error('Error reading middleware folder:', err);
                return res.status(500).send('Error reading middleware folder');
            }

            // Find the first text file in the middleware folder
            const txtFile = filenames.find(filename => filename.endsWith('.txt'));

            if (!txtFile) {
                return res.status(400).json({ status: "error", message: "Text file not found in middleware folder" });
            }

            const txtFilePath = path.join(middlewareFolderPath, txtFile);

            // Read the contents of the text file to get the destination folder path
            fs.readFile(txtFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading text file:', err);
                    return res.status(500).send('Error reading text file');
                }

                const destinationFolderPath = data.trim(); // Remove any whitespace characters

                // Proceed with handling file uploads
                Object.keys(files).forEach(key => {
                    const filepath = path.join(destinationFolderPath, files[key].name);
                    files[key].mv(filepath, (err) => {
                        if (err) return res.status(500).json({ status: "error", message: err });
                    });
                });

                // Delete the text file after handling file uploads
                fs.unlink(txtFilePath, (err) => {
                    if (err) {
                        console.error('Error deleting text file:', err);
                        return res.status(500).send('Error deleting text file');
                    }

                    return res.json({ status: 'success', message: Object.keys(files).toString() });
                });
            });
        });
    }
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
