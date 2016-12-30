"use strict";
var express = require("express");
var Boxers_1 = require("./../models/Boxers");
var router = express.Router();
router.get('/boxers', function (req, res, next) {
    Boxers_1.default.find().then(function (data) {
        res.json(data);
    });
});
router.post('/boxers', function (req, res, next) {
    Boxers_1.default.create(req.body, function (e, data) {
        if (e)
            return res.json(e);
        res.json(data);
    });
});
router.put('/boxers/:id', function (req, res, next) {
    Boxers_1.default.update({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true }, function (e, data) {
        res.json(data);
    });
});
module.exports = router;
