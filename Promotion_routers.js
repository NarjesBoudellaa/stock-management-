var express=require('express');
var routers=express.Router();
var Promotion=require('../models/Promotion');
var db=require('./db');


routers.get('/',function (req,res) {
    Promotion.find({},function(err,result){
            res.send(result);
        }
    )
})
routers.get('/add',function (req,res) {
    var promotions= new Promotion({dateDedut:'2018-07-11',dateFin:'2018-12-11'});
    //save the new model instance,passing a callback
    promotions.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(promotions)
    });
})
routers.get('/all',function (req,res) {
    Promotion.find(function (err,promotions) {
        if(err)throw err;
        res.send(promotions)
    });


})

routers.post('/add',function (req,res) {
    var promotions= new Promotion({dateDedut:req.body.dateDedut, dateFin:req.body.dateFin});
    //save the new model instance,passing a callback
    promotions.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.redirect("http://localhost:3000/Promotion/");
    });
})
routers.post('/remove',function (req,res) {
    Promotion.remove({_id: req.body.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("done")
    });
    res.send({remove:'done'})
})
/*routers.delete('/remove/:id',function (req,res) {
    Promotion.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})*/

routers.get('/promotionId',function (req,res) {
    Promotion.findById(req.query.id,function (err,v) {
        res.send(v)
        console.log(v)
        console.log(req.query)
    })

})
routers.post('/update',function (req,res) {
    Promotion.findByIdAndUpdate({_id: req .body.id},{dateDedut:req.body.dateDedut,
            dateFin:req.body.dateFin},
        {new :true},function(err,result){
            res.send({update:'done'});
        }
    )
})




module.exports=routers;
