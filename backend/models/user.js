// Pour créé une interface avec MongoDb, il faut créer un schéma, un modele de données qui va permettre d'emrgistrer, de lire, de modifier les objets qui sont dans la base
// Pour créer un Shéma on importe Mongoose
const mongoose = require("mongoose");

//On créé une constante pour appeler la fonction schema du package mongoose
const userSchema = mongoose.Schema({
    //On va lui passer un objet pour dicter les différents champs dont notre schema aura besoin
    // on attribut une clé qui se compose du type et de la mention "required" qui indique que ce champ est obligatoire
    email: {type: String, required: true},
    password: {type: String, required: true}
});
// Pour l'utiliser il faut exporter le modéle avec comme premier argument le nom du modèle et ensuite,  le schéma correspondant
module.exports = mongoose.model("user", userSchema);