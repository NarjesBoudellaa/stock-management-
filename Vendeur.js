var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var vendeurSchema = new Schema({
    nom: String,
    prenom: String,
    cin:Number,
    dateNaissance:Date,
    adress:String,
    telephone:Number,
    pointDeVente:String,
    email:String,
    login:String,
    mdp:String,
    img:{
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
    },
    listAchat:Array
});

// Compile model from schema
var vendeur = mongoose.model('vendeur', vendeurSchema );

module.exports=vendeur;