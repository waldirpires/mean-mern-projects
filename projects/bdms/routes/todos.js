var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:system@ds157187.mlab.com:57187/wrpires-bdms', ['todos']);
 
/* GET All todos */
router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});
 
/* GET One todo with the provided ID */
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});
 
/* POST/SAVE a todo */
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});
 
/* PUT/UPDATE a Todo */
router.put('/todo/:id', function(req, res, next) {
    var todo = req.body;
    
    if (!todo) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, todo, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
 
 
});
 
/* DELETE a todo */
router.delete('/todo/:id', function(req, res) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
 
});
 
module.exports = router;
