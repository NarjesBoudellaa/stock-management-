var express=require("express");
var app=express();

var admins=require("./routers/admin_routers");
var pointDeVentes=require("./routers/PointDeVente_routers");
var clients=require("./routers/Client_routers");
var produits=require("./routers/Produit_routers");
var promotions=require("./routers/Promotion_routers");
var ventes=require("./routers/Vente_routers");
var vendeurs=require("./routers/Vendeur_routers");
var caracteristiques=require("./routers/caracteristique_routers");


var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/PointDeVente",pointDeVentes);
app.use("/admin",admins);
app.use("/Client",clients);
app.use("/Produit",produits);
app.use("/Promotion",promotions);
app.use("/Vente",ventes);
app.use("/Vendeur",vendeurs);
app.use("/Caracteristique",caracteristiques);

/*app.get('/',function (req,res) {
    res.send("bonjour");

})*/



app.listen(3000,function () {
    console.log("server running")

})