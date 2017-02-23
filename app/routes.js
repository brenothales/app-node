var Todo = require('./models/todo');

module.exports = function(app) {

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


    app.get('/', function(req, res) {
        res.render('index', {controller : 'mainController', model : 'formData.text', count : 'todos'});
    });
    app.get('/filmes', function (req, res) {
        res.render('filmes', {controller: 'MovieController', model : 'formData', count : 'formData'});
    });

};
