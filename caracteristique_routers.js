var express=require('express');
var routers=express.Router();
var Caracteristique=require('../models/Caracteristique');
var db=require('./db');


routers.get('/',function (req,res) {
    Caracteristique.find({},function(err,result){
            res.send(result);
        }
    )
})
routers.get('/add11',function (req,res) {
    var caracteristiques= new Caracteristique({couleur:'size',taille:'L',nombre:5});
    //save the new model instance,passing a callback
    caracteristiques.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(caracteristiques)
    });
})
routers.get('/all',function (req,res) {
    Caracteristique.find(function (err,caracteristiques) {
        if(err)throw err;
        res.send(caracteristiques)
    });


})

routers.post('/add',function (req,res) {
    console.log(req.body)
    var caracteristiques= new Caracteristique({couleur:req.body.couleur,taille:req.body.taille,nombre:req.body.nombre});
    //save the new model instance,passing a callback
    caracteristiques.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(caracteristiques);
    });
})
routers.post('/remove',function (req,res) {
    Caracteristique.remove({_id: req.body.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("okkkkk remove")
    });
    res.send({remove:'done'})
})
/*routers.delete('/remove/:id',function (req,res) {
    Caracteristique.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})*/
routers.get('/caracteristiqueId',function (req,res) {
    Caracteristique.findById(req.query.id,function (err,v) {
        res.send(v)
        console.log(v)
        console.log(req.query)
    })

})

routers.post('/update',function (req,res) {
    Caracteristique.findByIdAndUpdate({_id: req .body.id},{couleur:req.body.couleur,taille:req.body.taille,nombre:req.body.nombre},
        {new :true},function(err,result){
            res.send(result);
        }
    )
})




module.exports=routers;
