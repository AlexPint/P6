const multer = require("multer");

// on prépare un dictionnaire qui permet de referencer les formats des fichiers qui seront traités et de les convertir au format.
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

// La constante suivante est la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants.
//Sa méthode diskStorage() configure le chemin et le nom de fichier pour les fichiers entrants.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    }
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        // il faut qu'on applique une extension au fichier. on Utilise les MNINESTYPES pour généré l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        // on appelle le callback et la on créé le file name
        callback(null, name + Date.now() + "." + extension);
    }
});



//Sa méthode single() crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.
module.exports = multer({storage: storage}).single('image');
