const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors')

const app = express()
const secret = '951asd357pom'

const corsOptions = {
    origin: 'editor.swagger.io'
};

// settings
app.use(cors(corsOptions))
app.disable("x-powered-by");
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded( { extended: false }));
app.use(cookieParser(secret));
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(require('./routes/index.js'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;