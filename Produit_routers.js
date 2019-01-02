var express=require('express');
var routers=express.Router();
var Produit=require('../models/Produit');
var Caracteristique=require('../models/Caracteristique');
var db=require('./db');


routers.get('/',function (req,res) {
    Produit.find({},function(err,result){
            res.send(result);
        }
    )
})
routers.get('/add11',function (req,res) {
    var produits= new Produit({nom:'chemise',prix:80,codeBarre:0});
    //save the new model instance,passing a callback
    produits.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(produits)
    });
})
routers.get('/all',function (req,res) {
    Produit.find(function (err,produits) {
        if(err)throw err;
        res.send(produits)
    });
})
routers.post('/add',function (req,res) {
    //var caracteristique= new Caracteristique(couleur,taille,nombre);
    Produit.findById(req.body.id , function(reqq, ress){
       console.log(ress)
        if(ress === undefined){

            var produits= new Produit({nom:req.body.nom, prix:req.body.prix,codeBarre:req.body.codeBarre, Caracteristique:[]});
            //save the new model instance,passing a callback
            produits.save(function(err,result){
                if(err){
                    res.send("error")
                }
                //saved!

                result.Caracteristique.push({couleur:req.body.couleur,taille:req.body.taille,nombre:req.body.nombre})

                //produits.push({couleur:req.body.couleur,taille:req.body.taille,nombre:req.body.nombre,caracteristique:req.body.caracteristique});
                result.save(function(err, result1){

                    res.send(result1);
                    console.log(result1);
                })


            });
        }else{

            ress.Caracteristique.push({couleur:req.body.couleur,taille:req.body.taille,nombre:req.body.nombre})

            //produits.push({couleur:req.body.couleur,taille:req.body.taille,nombre:req.body.nombre,caracteristique:req.body.caracteristique});
            ress.save(function(err, result1){

                res.send(result1);
                console.log(result1);
            })
        }
    })
})
routers.post('/remove',function (req,res) {
    Produit.remove({_id: req.body.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("okkkkk remove")
    });
    res.send({remove:'done'})
})
/*routers.delete('/remove/:id',function (req,res) {
    Produit.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})*/
routers.get('/produitId',function (req,res) {
    Produit.findById(req.query.id,function (err,v) {
        res.send(v)
        console.log(v)
        console.log(req.query)
    })
})
routers.post('/update',function (req,res) {
    Produit.findByIdAndUpdate({_id: req .body.id},{nom:req.body.nom, prix:req.body.prix,codeBarre:req.body.codeBarre},
        {new :true},function(err,result){
            res.send(result);
        }
    )
})
routers.post('/updateCa',function (req,res) {
    console.log(req.body.id)
    Produit.findById(req.body.id,function (err,v) {
       // res.send(v)
        console.log("hhhhhhhhhh")
        console.log(req.body.id)
        console.log(v)
       const nvcar=[]
        this.nvcar=[]
        for(var i=0 ;i<v.Caracteristique.length;i++) {

            if (v.Caracteristique[i]._id == req.body._id) {
                console.log(v.Caracteristique[i]._id)

                this.nvcar.push({couleur: req.body.couleur, taille: req.body.taille, nombre: req.body.nombre})
            }
            else {
                this.nvcar.push(v.Caracteristique[i])
            }
        }
        v.Caracteristique=this.nvcar
        v.save(function(err, result1){
            res.send(result1);
            console.log(result1);
        })
    })
})


module.exports=routers;
