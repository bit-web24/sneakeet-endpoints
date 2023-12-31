const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectToDB = require('./database/db');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');

const router = require('./routes/routes');
const admin = require('./routes/admin');

dotenv.config();
const app = express();
const port = process.env.PORT;

// Database Connection
connectToDB();

// Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());

// Enable method override for PUT and DELETE requests
app.use(methodOverride('_method'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', router);
app.use('/admin', admin);

// Serve the static HTML file when someone requests the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
