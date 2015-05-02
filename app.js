var express = require('express')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io')
  , flash = require('connect-flash')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , methodOverride = require('method-override')
  , session = require('express-session')
  , errorHandler = require('errorhandler')
  , tomatoService = require('tomato-service');

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server);

io = tomatoService.initSocket(io);
tomatoService.setBasePath(path.resolve('./service'));

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser('Parrrrrrrrrrrrrrrrrrrrrrrrrrrrrser'));
app.use(session({
  secret: 'Seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeecret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler());

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

