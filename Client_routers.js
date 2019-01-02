var express=require('express');
var routers=express.Router();
var Client=require('../models/Client');
var db=require('./db');


routers.get('/',function (req,res) {
    Client.find({},function(err,result){
            res.send(result);
        }
    )
})
routers.get('/add',function (req,res) {
    var clients= new Client({email:'bounarjes@gmail.com',telephone:99234208,dateNaissance:'08/05/1990',compteFB:'narjes boudella'});
    //save the new model instance,passing a callback
    clients.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(clients)
    });
})
routers.get('/all',function (req,res) {
    clients.find(function (err,client) {
        if(err)throw err;
        res.send(clients)
    });


})

routers.post('/add',function (req,res) {
    console.log(req.body)
    var clients= new Client({email:req.body.email,telephone:req.body.telephone,dateNaissance:req.body.dateNaissance
        ,compteFB:req.body.compteFB});
    //save the new model instance,passing a callback
    clients.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.redirect(clients);
    });
})
routers.post('/remove',function (req,res) {
    Client.remove({_id: req.body.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("okkkkk remove")
    });
    res.send({remove:'done'})
})
/*routers.delete('/remove/:id',function (req,res) {
    Client.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})*/


routers.post('/update',function (req,res) {
    Client.findByIdAndUpdate({_id: req .body.id},{email:req.body.email, telephone:req.body.telephone,
            dateNaissance:req.body.dateNaissance, compteFB:req.body.compteFB},
        {new :true},function(err,result){
            res.send(result);
        }
    )
})




module.exports=routers;
