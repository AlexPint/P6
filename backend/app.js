// On importe express via require
// express est un framework permettant de traiter les requêtes HTTP et fournit un système de middleware pour étendre ses fonctionnalitées.
const express = require("express");

// On créé une constant qui importe Mongoose
const mongoose = require("mongoose");

// On créé une constante qui va contenir notre application, une appplication express nous permettant de traiter différentes requêtes
const app = express();

//On importe ensuit nos routes
const userRoutes = require("./routes.js/user");
const sauceRoutes = require("./routes.js/sauce");
const path = require('path');


// Le fait d'importer mongoose nous permet d'utiliser sa méthode "connect" qui nous permet de se connecter à une base de données
// On ajoute un objet de config qui fait simplement partie de la config mongo db avec "useNewUrlParser"
mongoose.connect("mongodb+srv://AlexPinte:qTbUTq0YsZvkYACZ@clusterproject6.cvjivpg.mongodb.net/?retryWrites=true&w=majority", 
    {useNewUrlParser: true,
    useUnifiedTopology: true})
    // On ajoute une promise pour savoir si  on est connecté ou non 
    .then(() => console.log("Connexion à MongoDb réussie !"))
    .catch(() => console.log("Connexion à MongoDb échouée")); 



//Pour gérer les requêtes post venant du frontend on a besoin d'extraire le corp JSON.Pour cela express met à disposition le middleware suivant
app.use(express.json());

//Ce midddleware permet déffectuer des requêtes de la part de n'importe quel utilisateur. De base  
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



//!!!!! A REVOIR LE CHEMIN ATTENDU PAR LE FRONTEND!!!!!
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
//on ajoute une route pour gerer les fichiers static
app.use('./images', express.static(path.join(__dirname, 'images')));

      

// on va exporter cette constante pour qu'on puisse y acceder depuis les autres fichiers et notamment notre server Node
module.exports = app;

