const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

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

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socialmeadia',
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
    res.sendFile(__dirname + '/login.html'); // Serve the login form
});

app.post('/', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM login WHERE userId = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            // Redirect directly to the dashboard
            res.redirect(`/dashboard?userId=${results[0].userId}`);
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

app.get('/dashboard', (req, res) => {
    const userId = req.query.userId;

    if (userId) {
        // Fetch user dashboard data from the database
        const query = 'SELECT * FROM dashboard_data WHERE id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Error fetching dashboard data:', err);
                return res.status(500).send('Server error');
            }

            if (results.length > 0) {
                const dashboardData = {
                    totalFollowers: results[0].totalFollowers,
                    facebookHandle: results[0].facebookHandle,
                    facebookFollowers: results[0].facebookFollowers,
                    facebookDelta: results[0].facebookDelta,
                    twitterHandle: results[0].twitterHandle,
                    twitterFollowers: results[0].twitterFollowers,
                    twitterDelta: results[0].twitterDelta,
                    instagramHandle: results[0].instagramHandle,
                    instagramFollowers: results[0].instagramFollowers,
                    instagramDelta: results[0].instagramDelta,
                    youtubeHandle: results[0].youtubeHandle,
                    youtubeSubscribers: results[0].youtubeSubscribers,
                    youtubeDelta: results[0].youtubeDelta,
                    facebookPageViews: results[0].facebookPageViews,
                    facebookPageMovement: results[0].facebookPageMovement,
                    twitterPageViews: results[0].twitterPageViews,
                    twitterPageMovement: results[0].twitterPageMovement,
                    instagramPageViews: results[0].instagramPageViews,
                    instagramPageMovement: results[0].instagramPageMovement,
                    youtubePageViews: results[0].youtubePageViews,
                    youtubePageMovement: results[0].youtubePageMovement
                };

                // Render the 'index.ejs' view and pass the data
                return res.render('index', dashboardData);
            } else {
                return res.status(404).send('No data found for this user');
            }
        });
    } else {
        res.redirect('/');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
