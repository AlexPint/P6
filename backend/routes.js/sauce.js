
//-------VARIABLES-------------
const express = require('express');
// on importe le middleware d'authentification. puis nous le metterons avabnt nos gestionnaises de routes dans les router
const router = express.Router();
const auth = require("auth");
// On ajoute le middleware multer a notre route  
const multer = require('../middleware/multer-config');
const sauceCtrl = require("../controllers.js/sauce");

//---------ROUTES--------------
//Créer
router.post("/", auth, multer, sauceCtrl.createSauce);
//Voir les sauces
router.get("/", auth, sauceCtrl.viewAllSauce);
//Supprimer une sauce
// !!!!!! PK IDDDD
router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;