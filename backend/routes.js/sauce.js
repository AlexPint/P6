
//-------VARIABLES-------------
const express = require('express');
// on importe le middleware d'authentification. puis nous le metterons avabnt nos gestionnaises de routes dans les router
const router = express.Router();
const auth = require("../middleware/auth");
// On ajoute le middleware multer a notre route  
const multer = require('../middleware/multer-config');
const sauceCtrl = require("../controllers.js/sauce");

//---------ROUTES--------------

// Voir les sauces
router.get("/", auth, sauceCtrl.findAllSauce);
// Renvoie une sauce
router.get("/:id", auth, sauceCtrl.findOneSauce);
//Créer
router.post("/", auth, multer, sauceCtrl.createSauce);
//Modifier une sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
//Supprimer une sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);
//Liker une sauce
router.post("/:id/like", auth, sauceCtrl.likeSauce)

module.exports = router;