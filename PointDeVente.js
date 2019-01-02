var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var pointDeVenteSchema = new Schema({
    nom: String,
    adress: String,
    telephone: Number,
    email:String,
    dateDouverture:Date,
    latitude:Number,
    longitude:Number
});

// Compile model from schema
var pointDeVente = mongoose.model('pointDeVente', pointDeVenteSchema );

module.exports=pointDeVente;