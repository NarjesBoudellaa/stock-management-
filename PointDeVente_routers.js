var express=require('express');
var routers=express.Router();
var PointDeVente=require('../models/PointDeVente');
var db=require('./db');


routers.get('/',function (req,res) {
    PointDeVente.find({},function(err,result){
            res.send(result);
        }
    )
})
routers.get('/add11',function (req,res) {
    var pointDeVentes= new PointDeVente({nom:'sousseboutique',adress:'sousse',telephone:99234208,
        email:'sousseboutique@gmail.com',dateDouverture:'01/10/2018',latitude:222 ,longitude:111});
    //save the new model instance,passing a callback
    pointDeVentes.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(pointDeVentes)
    });
})

routers.post('/add',function (req,res) {
    var pointDeVentes= new PointDeVente({ nom:req.body.nom,adress:req.body.adress, telephone:req.body.telephone,
        email:req.body.email,dateDouverture:req.body.dateDouverture,latitude:req.body.latitude,longitude:req.body.longitude});
    //save the new model instance,passing a callback
    pointDeVentes.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.redirect("http://localhost:3000/PointDeVente/");
    });
})
routers.post('/remove',function (req,res) {
    PointDeVente.remove({_id: req.body.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("okkkkk remove")
    });
    res.send({remove:'done'});
})
/*routers.delete('/remove/:id',function (req,res) {
    pointDeVentes.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})*/

routers.get('/pointVenteId',function (req,res) {
    PointDeVente.findById(req.query.id,function (err,v) {
        res.send(v)
        console.log(v)
        console.log(req.query)
    })

})

routers.post('/update',function (req,res) {
console.log(req.body)
    PointDeVente.findByIdAndUpdate({_id: req .body.id},{ nom:req.body.nom,adress:req.body.adress, telephone:req.body.telephone,
            email:req.body.email,dateDouverture:req.body.dateDouverture,latitude:req.body.latitude,longitude:req.body.longitude},
        {new :true},function(err){
            res.send({update:'done'});
        }
    )
})




module.exports=routers;
