var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:system@ds157187.mlab.com:57187/wrpires-bdms', ['donors']);
 
/* GET All donors */
router.get('/donors', function(req, res, next) {
    db.donors.find(function(err, donors) {
        if (err) {
            res.send(err);
        } else {
            res.json(donors);
        }
    });
});
 
/* GET One donor with the provided ID */
router.get('/donor/:id', function(req, res, next) {
    db.donors.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, donors) {
        if (err) {
            res.send(err);
        } else {
            res.json(donors);
        }
    });
});
 
/* POST/SAVE a donor */
router.post('/donor', function(req, res, next) {
    var donor = req.body;
    console.log(donor);
    if (!donor) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.donors.save(donor, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});
 
/* PUT/UPDATE a Todo */
router.put('/donor/:id', function(req, res, next) {
    var donor = req.body;
      
    if (!donor) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.donors.update({
            _id: mongojs.ObjectId(req.params.id)
        }, donor, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
 
 
});
 
/* DELETE a donor */
router.delete('/donor/:id', function(req, res) {
    db.donors.remove({
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
