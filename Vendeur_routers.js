var express=require('express');
var routers=express.Router();
var Vendeur=require('../models/Vendeur');
var db=require('./db');
var multer = require('multer');
var path = require('path');


routers.use(express.static(path.join(__dirname, 'uploads')));
routers.get('/',function (req,res) {
    Vendeur.find({},function(err,result){
            res.send(result);
        }
    )
})
var storage = multer.diskStorage({
    // destino del fichero
    destination: function (req, file, cb) {
        cb(null, './routers/uploads/')
    },
    // renombrar fichero
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

routers.post("/upload", upload.array("uploads[]", 12), function (req, res) {

    var vendeur = new Vendeur({

        nom:req.query.nom, prenom:req.query.prenom, cin:req.query.cin,
        dateNaissance:req.query.dateNaissance,adress:req.query.adress,telephone:req.query.telephone,pointDeVente:req.query.pointDeVente,
        email:req.query.email,login:req.query.login,mdp:req.query.mdp,
        img:{
            fieldname: req.files[0].fieldname,
            originalname: req.files[0].originalname,
            encoding: req.files[0].encoding,
            mimetype: req.files[0].mimetype,
            destination: req.files[0].destination,
            filename: req.files[0].fieldname,
            path: req.files[0].path,
            size: req.files[0].size
        }
    })
    vendeur.save(function (err, result) {
        if(err){
            console.log(err)
        }else{
            console.log('okkkkkkk')
            res.send(req.files[0]);
        }
    })
});


routers.use(express.static(__dirname + '/public'));


routers.get('/routers/uploads/:img',function (req,res) {

    console.log(__dirname+"/uploads/"+req.params.img);

    res.sendFile(__dirname+"/uploads/"+req.params.img)
})

routers.get('/add',function (req,res) {
    var vendeurs= new Vendeur({nom:'narjes',prenom:'boudellaa',cin:123456,dateNaissance:'08/05/1990'
        ,adress:'tatouine',telephone:99234208,pointDeVente:'sousse boutique',email:'bounarjes@gmail.com',login:'nar',mdp:'12345'});
    //save the new model instance,passing a callback
    vendeurs.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.send(vendeurs)
    });
})
routers.get('/all',function (req,res) {
    vendeurs.find(function (err,vendeurs) {
        if(err)throw err;
        res.send(vendeurs)
    });


})

routers.post('/add',function (req,res) {
    var vendeurs= new Vendeur({nom:req.body.nom, prenom:req.body.prenom, cin:req.body.cin,
        dateNaissance:req.body.dateNaissance,adress:req.body.adress,telephone:req.body.telephone,pointDeVente:req.body.pointDeVente,
        email:req.body.email,login:req.body.login,mdp:req.body.mdp});
    //save the new model instance,passing a callback
    vendeurs.save(function(err){
        if(err){
            console.log(err)
            res.send("error")
        }
        //saved!
        res.redirect(vendeurs);
    });
})
routers.post('/remove',function (req,res) {
    Vendeur.remove({_id: req.body.id},function (err) {
        if(err){
            res.send("error");
        }
        //res.send("okkkkk remove")
    });
    res.send({remove:'done'})
})
/*routers.delete('/remove/:id',function (req,res) {
    Vendeur.remove({_id: req.params.id},function (err) {
        if(err) {
            res.send("error");
        }
    });
    res.send("supprimé");
})*/

routers.get('/vendeurId',function (req,res) {
    Vendeur.findById(req.query.id,function (err,v) {
        res.send(v)
        console.log(v)
        console.log(req.query)
    })

})

routers.post('/update', upload.array("uploads[]", 12),function (req,res) {Vendeur.findById( req .query.id,
        function(err , result){
                result.nom=req.query.nom,
                result.prenom=req.query.prenom,
                result.cin=req.query.cin,
                result.dateNaissance=req.query.dateNaissance,
                result.adress=req.query.adress,
                result.telephone=req.query.telephone,
                result.pointDeVente=req.query.pointDeVente,
                result.email=req.query.email,
                result.login=req.query.login,
                result.mdp=req.query.mdp ,
                result.img={
                fieldname: req.files[0].fieldname,
                    originalname: req.files[0].originalname,
                    encoding: req.files[0].encoding,
                    mimetype: req.files[0].mimetype,
                    destination: req.files[0].destination,
                    filename: req.files[0].fieldname,
                    path: req.files[0].path,
                    size: req.files[0].size
            }

            result.save(function(err){
                if(err){
                    console.log(err)
                    res.send("error")
                }
                //saved!
                res.send({update:'done'});
                console.log('result:',result)
            });

        }
    )
})
//ajouter achat
routers.get('/ajoutAchat',function (req,res) {
    Vendeur.findById(req.query.id,function (err,vend) {
        if(err){
            res.send({err:'error'})
            throw err;
        }
        else {
            vend.listAchat.push({
                date:req.query.date,
                produits:req.query.produits,
                couleurs:req.query.couleurs,
                tailles:req.query.tailles,
                prixx:req.query.prixx,
                Promotion:req.query.Promotion,
                prixPromotion:req.query.prixPromotion,
                quantites:req.query.quantites,
                totales:req.query.totales
            })
        }
        vend.send(function (err) {
            if(err){
                res.send({ajouAchat:false})
                throw err;
            }
            else {
                res.send({ajouAchat:true})
            }
        })
    })
})
//liste vente
routers.get('/listeV',function (req,res) {
    Vendeur.findById(req.queryid,function (err,vend) {
        if(err){
            res.send({err:'error'})
            throw err;
        }
        else {
            res.send(vend.listAchat)
        }
    })
})
//login

routers.post('/login',function (req,res) {
    console.log(req.body)
    Vendeur.find({email:req.body.email,mdp:req.body.mdp},function (err,a) {
        if(a.length == 0){
            res.send({auth :false});
        }
        if (a.length !=0){
            res.send({auth:true,id:a[0]._id,role:'user'})
        }
    })
})
module.exports=routers;
