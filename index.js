const express = require('express');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
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

app.get('/', (req, res) => {
	res.render('WinterSkate.ejs');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
