const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('flash');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');
const getUsers = require('./utils/getUsers');
const pool = require('./utils/db');
const pgSession = require('connect-pg-simple') (session);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; 


require('./passport-config')

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'user_sessions'
    }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))
app.use(passport.initialize())
app.use(passport.session())
const users = []



app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
//Configure Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json()
  ),
  transports: [
    //write logs to file
    new winston.transports.File({ filename: 'error.log', level: 'error'}),
    new winston.transports.File({ filename: 'combined.log'})
  ]
});

//Create Custom Stream for Morgan
const stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

//Set up Morgan for request logging
app.use(morgan('combined', { stream }));

// Middleware to handle JSON requests
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));
//NEW MIDDLEWARE
app.use(flash())

app.use(methodOverride('_method'))
app.get('/', (req, res) => {
	res.render('index.ejs');
});
//END NEW MIDDLEWARE
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
