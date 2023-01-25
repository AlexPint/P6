const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    // !!!!COMMENT ASSOCIER ID MONGO DB UNIQUE CREE EN AMONT PAR LUTILISATEUR
    //!!!  tout doit etre en required true ?
    // userLiked et usersDisliked est-ce le bon format type??
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    userLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true},
});

module.exports = mongoose.model("sauce", sauceSchema);