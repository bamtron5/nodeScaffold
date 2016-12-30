"use strict";
var express = require("express");
var Boxers_1 = require("./../models/Boxers");
var router = express.Router();
router.get('/boxers', function (req, res, next) {
    Boxers_1.default.find().then(function (data) {
        res.json(data);
    });
});
module.exports = router;
