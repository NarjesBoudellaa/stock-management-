var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
    dateDedut:Date,
    dateFin:Date,
});

// Compile model from schema
var promotion = mongoose.model('promotion', promotionSchema );

module.exports=promotion;