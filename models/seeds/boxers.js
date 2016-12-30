"use strict";
var _this = this;
var Boxers_1 = require("./../Boxers");
var seeds = [
    { name: 'Bill Brasky', age: 37, weight: 201 },
    { name: 'Chip McDaniels', age: 29, weight: 179 },
    { name: 'Kevin Evans', age: 28, weight: 181 }
];
seeds.map(function (seed) {
    Boxers_1.default.create(seed, function (e, data) {
        if (e)
            throw new Error(e);
        console.log("Created " + data.name + " from " + _this.constructor['name'] + " as " + data._id);
    });
});
