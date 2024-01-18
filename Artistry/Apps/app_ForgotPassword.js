const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 5500;

const accountSid = 'YOUR_ACCOUNT_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const twilioNumber = 'YOUR_TWILIO_PHONE_NUMBER';

app.use(cors());

// MYSQL connection
const connection = mysql.createConnection({
    host:  'localhost',
    user:  'root',
    password: 'STT_ArtistryUserReg_2023',
    database: 'artistry'
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

// Serve static files (like your HTML)
app.use(express.static('public'));

// Handle forgot password
app.post('/forgot-password', (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    // Generate a random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Store the verification code in the database
    const query = 'INSERT INTO verification_codes (phone_number, verification_code, created_at) VALUES (?, ?, NOW())';
    connection.query(query, [phoneNumber, verificationCode], (err, results) => {
        if (err) {
            console.error('Error storing verification code:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Send the verification code to the user's phone number
            const client = twilio(accountSid, authToken);
            client.messages
                .create({
                    body: `Your verification code is ${verificationCode}`,
                    from: twilioNumber,
                    to: phoneNumber
                })
                .then((message) => {
                    console.log('Verification code sent:', message.sid);
                    res.status(200).send('Verification code sent');
                })
                .catch((error) => {
                    console.error('Error sending verification code:', error);
                    res.status(500).send('Internal Server Error');
                });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});