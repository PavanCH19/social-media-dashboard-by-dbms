const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files like images, CSS, etc.
app.use(express.static(path.join(__dirname, 'resources')));

// Serve the uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('public'));  // This will serve files from the 'public' folder


// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socialmeadia',  // Your actual database name
    port: '3306'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('login');  // Correctly renders the login.ejs view
});

app.get('/dashboard/admin/analytics', (req, res) => {
    res.render('analytics');  // Make sure this route is correct
});


app.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('login', { errorMessage: 'userId and password are required' });
    }

    const query = 'SELECT * FROM login WHERE userId = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            res.redirect(`/dashboard/${results[0].userId}`);
        } else {
            // Render the login page with an error message
            //res.render('login', { errorMessage: 'Invalid userId or password' });
            res.send("invalid useid or password")
        }
    });
});


// Multer for file upload
const storage = multer.memoryStorage(); // Store file in memory (not on disk)
const upload = multer({ storage: storage });
// Route to handle profile image upload (save as BLOB)
app.post('/update-profile', upload.single('new_profile_image'), (req, res) => {
    const { username, current_password } = req.body;
    const newProfileImage = req.file ? req.file.buffer : null;  // Get the uploaded image buffer (binary data)

    // Check if current password matches (simplified for demonstration)
    db.query('SELECT password FROM login WHERE userId = ?', [username], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).send('Error retrieving user');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const storedPassword = results[0].password;

        if (current_password !== storedPassword) {
            // If the password is incorrect, render the page with an error message
            return res.render('index', { userId: username, errorMessage: 'Incorrect current password' });
        }

        // Proceed with updating the profile
        let query = 'UPDATE login SET userId = ? WHERE userId = ?';
        let params = [username, username];

        if (newProfileImage) {
            query = 'UPDATE login SET userId = ?, profile_image = ? WHERE userId = ?';
            params = [username, newProfileImage, username];  // Store the image as BLOB
        }

        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Error updating profile:', err);
                return res.status(500).send('Error updating profile');
            }

            res.redirect(`/dashboard/${username}`);
        });
    });
});


app.get('/dashboard/:userId', (req, res) => {
    const userId = req.params.userId;

    // Fetch user profile and dashboard data
    db.query('SELECT userId, profile_image FROM login WHERE userId = ?', [userId], (err, userResult) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).send('Server error');
        }

        if (userResult.length > 0) {
            const profileImage = userResult[0].profile_image; // Retrieve image data as BLOB

            // Fetch dashboard data (same as before)
            db.query('SELECT * FROM dashboard_data WHERE id = ?', [userId], (err, dashboardResult) => {
                if (err) {
                    console.error('Error fetching dashboard data:', err);
                    return res.status(500).send('Server error');
                }

                if (dashboardResult.length > 0) {
                    const dashboardData = {
                        totalFollowers: dashboardResult[0].totalFollowers,
                        facebookHandle: dashboardResult[0].facebookHandle,
                        facebookFollowers: dashboardResult[0].facebookFollowers,
                        facebookDelta: dashboardResult[0].facebookDelta,
                        twitterHandle: dashboardResult[0].twitterHandle,
                        twitterFollowers: dashboardResult[0].twitterFollowers,
                        twitterDelta: dashboardResult[0].twitterDelta,
                        instagramHandle: dashboardResult[0].instagramHandle,
                        instagramFollowers: dashboardResult[0].instagramFollowers,
                        instagramDelta: dashboardResult[0].instagramDelta,
                        youtubeHandle: dashboardResult[0].youtubeHandle,
                        youtubeSubscribers: dashboardResult[0].youtubeSubscribers,
                        youtubeDelta: dashboardResult[0].youtubeDelta,
                        facebookPageViews: dashboardResult[0].facebookPageViews,
                        facebookPageMovement: dashboardResult[0].facebookPageMovement,
                        twitterPageViews: dashboardResult[0].twitterPageViews,
                        twitterPageMovement: dashboardResult[0].twitterPageMovement,
                        instagramPageViews: dashboardResult[0].instagramPageViews,
                        instagramPageMovement: dashboardResult[0].instagramPageMovement,
                        youtubePageViews: dashboardResult[0].youtubePageViews,
                        youtubePageMovement: dashboardResult[0].youtubePageMovement
                    };

                    // Convert BLOB image to base64
                    const profileImageBase64 = profileImage ? profileImage.toString('base64') : null;

                    // Send the BLOB image as a response (image data)
                    res.render('index', {
                        ...dashboardData,
                        profile_image: profileImageBase64,  // Convert the BLOB to a base64 string for the frontend
                        userId: userId
                    });
                } else {
                    return res.status(404).send('No dashboard data found for this user');
                }
            });
        } else {
            return res.status(404).send('User not found');
        }
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


