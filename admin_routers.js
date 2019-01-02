var express=require('express');
var routers=express.Router();
var admin=require('../models/admin');
var db=require('./db');


routers.get('/',function (req,res) {
    admin.find({},function(err,result){
            res.send(result);
        }
    )
})
routers.get('/add',function (req,res) {
    var admins= new admin({idAdmin:1,nom:'narjes',prenom:'boudellaa',cin:123456,dateNaissance:'08/05/1990'
        ,adress:'tatouine',telephone:99234208,email:'bounarjes@gmail.com',login:'nar',mdp:'12345'});
    //save the new model instance,passing a callback
    admins.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(admins)
    });
})
routers.get('/all',function (req,res) {
    admins.find(function (err,admins) {
        if(err)throw err;
        res.send(admins)
    });


})

routers.get('/add',function (req,res) {
    var admins= new admin({idAdmin:req.query.idAdmin,nom:req.query.nom, prenom:req.query.prenom, cin:req.query.cin,
        dateNaissance:req.query.dateNaissance,adress:req.query.adress,telephone:req.query.telephone,email:req.query.email,login:req.query.login,mdp:req.query.mdp});
    //save the new model instance,passing a callback
    admins.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.redirect("http://localhost:3000/admin/");
    });
})
routers.get('/remove',function (req,res) {
    admin.remove({_id: req.query.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("okkkkk remove")
    });
    res.redirect("http://localhost:3000/admin/");
})
routers.delete('/remove/:id',function (req,res) {
    admin.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})

routers.get('/adminId',function (req,res) {
    admin.findById(req.query.id,function (err,v) {
        res.send(v)
        console.log(v)
        console.log(req.query)
    })

})

routers.post('/update',function (req,res) {
    admin.findByIdAndUpdate({_id: req .body.id},{idAdmin:req.body.idAdmin,nom:req.body.nom, prenom:req.body.prenom, cin:req.body.cin,
            dateNaissance:req.body.dateNaissance,adress:req.body.adress,telephone:req.body.telephone,email:req.body.email,login:req.body.login,mdp:req.body.mdp},
        {new :true},function(err,result){
            res.send(result);
        }
    )
})
routers.post('/login',function (req,res) {
    admin.find({email:req.body.email,mdp:req.body.mdp},function (err,a) {
        if(a.length == 0){
            res.send({auth :false});
        }
        if (a.length !=0){
            res.send({auth:true,id:a[0]._id,role:'admin'})
        }
    })
})


module.exports=routers;
