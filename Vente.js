var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;
var produitSchema = new Schema({

    nom:String,
    prix:String,
    couleur:String,
    taille:String
});
var venteSchema = new Schema({

    date:Date,
    facture:Number,
    idVendeur:String,
    pointVente:String,
    produits:[]

});

// Compile model from schema
var vente = mongoose.model('vente', venteSchema );

module.exports=vente;