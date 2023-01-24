const Sauce = require("../models/Sauce");
const fs = require('fs');

//---------Créer-------------
exports.createSauce = (req, res, next) => {
    // première chose a faire est de parser l'objet requête. En effet, l'objet qui nous est envoyé dans la requête va etre envoyé sous forme json mais en chaîne de caractère.
    const sauceObject = JSON.parse(req.body.sauce);
    // Puis, on va supprimer dans cet objet deux champs:  le champ _id puisque l'id de l'objet va être généré automatiquement par notre base de données
        delete sauceObject._id;
        // et on supprime le champ userID qui correspond a la personne qui a creér l'objet car nous ne voulons pas faire confiance au client. Donc on va utiliser le userId qui vient du token d'authentification parce que'on est sur qu'il est valide.  Ca va empecher a une personne mal intentionnée de faire une requete avec son token d'auth en nous envoyant le user id de qqun d'autres.
        delete sauceObject._userId;
    
    const sauce = new Sauce({
        ...sauceObject,
        // on extrait le userId de l'objet requete grace à notre middleware 
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
        .catch(error => { res.status(400).json( { error })})
};

//--------Supprimer une sauce------------
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
        // on verifie que c'est  bien le propriétaire de l'annonce qui supprime son fichier. On s'assure que le userid en base correspond de celui que nous recuperons du token
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                // si ca correspond il nous faut alors supprimer l'objet de  de la base de données, mais il nous faut aussi supprimer l'image du système de fichier
                const filename = sauce.imageUrl.split('/images/')[1];
                // fs.unlick est la methode pour supprimer l'image
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
        res.status(500).json({ error });
        });
};

//------------Voir les sauces-------------
exports.viewAllSauce = (req, res, next) => {
    // Thing permet d'enrgistrer dans la base, mais il permet aussi de lire dans la base les différents objets en vente  
    // On veut la liste compléte donc pas besoin d'arguments  
    Sauce.find()
    // Qui retourne une promise, dans le then on récupère le tableau de tous les Thing, puis on va les renvoyer en réponse de code 200 (ok). 
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
};



