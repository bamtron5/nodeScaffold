"use strict";
var mongoose = require("mongoose");
var BoxerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    weight: Number
});
console.log('yes');
console.log('lies');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Boxer', BoxerSchema);
