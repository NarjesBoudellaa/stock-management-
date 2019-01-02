var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var caracteristiqueSchema = new Schema({

    couleur:String,
    taille:String,
    nombre:Number,
});


var produitSchema = new Schema({
    nom:String,
    prix:Number,
    codeBarre:Number,
    caracteristique:[caracteristiqueSchema]
});

// Compile model from schema
var produit = mongoose.model('produit', produitSchema );

module.exports=produit;