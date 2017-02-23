var express        = require('express'),
    app            = express(),
    mongoose       = require('mongoose'),
    port           = process.env.PORT || 8080,
    database       = require('./config/database'),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

// configuration

  mongoose.connect(database.url); // connect to mongoDB database on modulus.io

  app.use(express.static(__dirname + '/public'));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(methodOverride());
  app.set('view engine', 'jade');
  app.use(express.static('views'));
  
  // routes
  require('./app/routes')(app);


  app.listen(port);



  console.log("app na porta " + port);
