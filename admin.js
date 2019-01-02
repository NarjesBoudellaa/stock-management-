var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    idAdmin:Number,
    nom: String,
    prenom: String,
    cin:Number,
    dateNaissance:Date,
    adress:String,
    telephone:Number,
    email:String,
    login:String,
    mdp:String,
});

// Compile model from schema
var admin = mongoose.model('admin', adminSchema );

module.exports=admin;