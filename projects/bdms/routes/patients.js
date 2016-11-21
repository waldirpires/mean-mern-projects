var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:system@ds157187.mlab.com:57187/wrpires-bdms', ['patients']);

/* GET All patients */
router.get('/patients', function(req, res, next) {
    db.patients.find(function(err, patients) {
        if (err) {
            res.send(err);
        } else {
            res.json(patients);
        }
    });
});
 
/* GET One patient with the provided ID */
router.get('/patient/:id', function(req, res, next) {
    db.patients.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, patients) {
        if (err) {
            res.send(err);
        } else {
            res.json(patients);
        }
    });
});
 
/* POST/SAVE a patient */
router.post('/patient', function(req, res, next) {
    var patient = req.body;
    if (!patient) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.patients.save(patient, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});
 
/* PUT/UPDATE a patient */
router.put('/patient/:id', function(req, res, next) {
    var patient = req.body;
 
    if (!patient) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.patients.update({
            _id: mongojs.ObjectId(req.params.id)
        }, patient, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
 
 
});
 
/* DELETE a patient */
router.delete('/patient/:id', function(req, res) {
    db.patients.remove({
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
