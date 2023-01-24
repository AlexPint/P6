// Apres avoir créé le controller, on met en place le router correspondant.
// On a besoin d'express afin de créer un router
const express = require("express");
// Ensuite on créé le router avec cette fonction
const router = express.Router();
// Il faut aussi le controller pour associer les fonctions aux différentes routes
const userCtrl = require("../controllers.js/user");
    // Puis on va créer deux routes POST, car le front end envoi des informations comme l'adresse mail et le mdp
    router.post("/signup", userCtrl.signup)
    router.post("/login", userCtrl.login)
    // On exporte ce router pour l'importer ensuite dans le fichier app.js
module.exports = router;