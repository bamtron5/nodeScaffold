"use strict";
var Boxer_1 = require("../Boxer");
var BoxerSeed = (function () {
    function BoxerSeed() {
        console.log('boxerseed');
        var seeds = [
            { name: 'Bill Brasky', age: 37, weight: 201 },
            { name: 'Chip McDaniels', age: 29, weight: 179 },
            { name: 'Kevin Evans', age: 28, weight: 181 }
        ];
        seeds.map(function (seed) {
            Boxer_1.default.create(seed, function (e, data) {
                if (e)
                    throw new Error(e);
                console.log(data);
            });
        });
    }
    return BoxerSeed;
}());
exports.BoxerSeed = BoxerSeed;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new BoxerSeed();
