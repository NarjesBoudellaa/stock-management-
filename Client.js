var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    email:String,
    telephone:Number,
    dateNaissance:Date,
    compteFB:String,
});

// Compile model from schema
var client = mongoose.model('client', clientSchema );

module.exports=client;