var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:system@ds157187.mlab.com:57187/wrpires-bdms', ['donations']);
 
/* GET All Donations */
router.get('/donations', function(req, res, next) {
    db.donations.find(function(err, donations) {
        if (err) {
            res.send(err);
        } else {
            res.json(donations);
        }
    });
});
 
/* GET One donation with the provided ID */
router.get('/donation/:id', function(req, res, next) {
    db.donations.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, donations) {
        if (err) {
            res.send(err);
        } else {
            res.json(donations);
        }
    });
});
 
/* POST/SAVE a donation */
router.post('/donation', function(req, res, next) {
    var donation = req.body;
    if (!donation.text || !(donation.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.donations.save(donation, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});
 
/* PUT/UPDATE a Todo */
router.put('/donation/:id', function(req, res, next) {
    var donation = req.body;
    
    if (!donation) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.donations.update({
            _id: mongojs.ObjectId(req.params.id)
        }, donation, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
 
 
});
 
/* DELETE a Donation */
router.delete('/donation/:id', function(req, res) {
    db.donations.remove({
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
