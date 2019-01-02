var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var caracteristiqueSchema = new Schema({

    couleur:String,
    taille:String,
    nombre:Number,
});

// Compile model from schema
var caracteristique = mongoose.model('caracteristique', caracteristiqueSchema );

module.exports=caracteristique;