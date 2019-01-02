var express=require('express');
var routers=express.Router();
var Vente=require('../models/Vente');
var Produits=require('../models/Produit');
var db=require('./db');
var Caracteristique=require('../models/Caracteristique');


routers.get('/',function (req,res) {
    Vente.find({},function(err,result){
            res.send(result);
        }
    )
})
routers.get('/add',function (req,res) {
    var ventes= new Vente({detail:'2018-07-11',inPromotion:1});
    //save the new model instance,passing a callback
    ventes.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(ventes)
    });
})
routers.get('/all',function (req,res) {
    Vente.find(function (err,ventes) {
        if(err)throw err;
        res.send(ventes)
    });
})

routers.post('/add',function (req,res) {
    console.log(req.body)
    var ventes= new Vente({detail:req.body.detail,inPromotion:false});
    //save the new model instance,passing a callback
    ventes.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(ventes);
    });
})
routers.post('/remove',function (req,res) {
    Vente.remove({_id: req.body.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("okkkkk remove")
    });
    res.send({remove:'done'})
})
/*routers.delete('/remove/:id',function (req,res) {
    Vente.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})*/
routers.get('/venteId',function (req,res) {
    Vente.findById(req.query.id,function (err,v) {
        res.send(v)
        console.log(v)
        console.log(req.query)
    })
})
routers.post('/update',function (req,res) {
    Vente.findByIdAndUpdate({_id: req .body.id},{detail:req.body.detail,inPromotion:req.body.inPromotion,},
        {new :true},function(err,result){
            res.send(result);
        }
    )
})

//ajout vente
routers.post('/addvente' ,function(req ,res){
    Vente.findById(req.body._id , function(reqq, ress){
       console.log(req.body._id)
       // console.log(ress)
        if(ress === null){
            console.log("1111111")
            var Vente1= new Vente({date:req.body.date,facture:req.body.facture,idVendeur:req.body.idVendeur,pointVente:req.body.pointVente,produits:[]});
            //save the new model instance,passing a callbackl
            Vente1.save(function(err,result){
                if(err){
                    res.send("error")
                }
                //saved!
                result.produits.push({"nom":req.body.nom,"prix":req.body.prix,"couleur":req.body.couleur,"taille":req.body.taille,
                    "promotion":req.body.promotion,"prixPromotion":req.body.prixPromotion,"quantite":req.body.quantite,"totale":req.body.totale})
                result.save(function(err, result1){
                   res.send(result1);

                    console.log("hhhhhhhh")

                    Produits.findById(req.body.idp,function (err,v) {
                        //res.send(v)
                       // console.log(v)
                        const nvcar=[]
                        this.nvcar=[]
                        for(var i=0 ;i<v.Caracteristique.length;i++) {

                            if (v.Caracteristique[i]._id == req.body.idc) {

                                this.nvcar.push({couleur: v.Caracteristique[i].couleur, taille:v.Caracteristique[i].taille, nombre: req.body.nombre})
                            } else {
                                this.nvcar.push(v.Caracteristique[i])
                            }
                        }
                        v.Caracteristique=this.nvcar
                        v.save(function(err, result11){
                           // res.send(result1);
                            console.log(result11);
                        })
                    })
                })
            });
        }
        else{
            console.log("22222222222")
            ress.produits.push({"nom":req.body.nom,"prix":req.body.prix,"couleur":req.body.couleur,"taille":req.body.taille,
                "promotion":req.body.promotion,"prixPromotion":req.body.prixPromotion,"quantite":req.body.quantite,"totale":req.body.totale})
            ress.save(function(err, result1){
                res.send(result1);
                console.log(result1);


                Produits.findById(req.body.idp,function (err,v) {
                    /*res.send(v)
                    console.log(v)*/
                    const nvcar=[]
                    this.nvcar=[]
                    for(var i=0 ;i<v.Caracteristique.length;i++) {

                        if (v.Caracteristique[i]._id == req.body.idc) {

                            this.nvcar.push({couleur: v.Caracteristique[i].couleur, taille:v.Caracteristique[i].taille, nombre: req.body.nombre})
                        } else {
                            this.nvcar.push(v.Caracteristique[i])
                        }
                    }
                    v.Caracteristique=this.nvcar
                    v.save(function(err, result1){
                        //res.send(result1);
                        //console.log(result1);
                    })
                })
            })
        }
    })
})

module.exports=routers;
