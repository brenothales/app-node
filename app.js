  var express  = require('express'),
      app      = express(),                             
      mongoose = require('mongoose'),                   
      morgan = require('morgan'),           
      bodyParser = require('body-parser'),  
      methodOverride = require('method-override');

  

  mongoose.connect('mongodb://root:root@jello.modulusmongo.net:27017/onaM9egu'),     

  app.use(express.static(__dirname + '/public'));                 
  app.use(morgan('dev'));                                         
  app.use(bodyParser.urlencoded({'extended':'true'}));            
  app.use(bodyParser.json());                                     
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
  app.use(methodOverride());
  app.set('view engine', 'jade');

  // model =================
  var Todo = mongoose.model('Todo', {
      text : String
  });
   
    
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)

            res.json(todos); 
        });
    });

    app.post('/api/todos', function(req, res) {

        //  AJAX from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete 
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);


            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });




  app.listen(3000);

    app.use(express.static('views'));
    app.get('/', function(req, res) { 
        res.render('index')  
    });

  console.log("app na porta 3000");