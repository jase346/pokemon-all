const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const router = require('./routes/index.js');

//init
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(flash());

//globals variables

//routes
app.use(router);

//public
app.use(express.static(path.join(__dirname, 'public')));

//strating sever
app.listen(app.get('port'), () => console.log('listening on port ' + app.get('port')) );