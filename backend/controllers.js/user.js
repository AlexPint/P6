// On importe le modèle schénma pour s'en servir dans les différentes fonctions/middlewares
const User = require("../models/user");
// On importe le token d'authentification dans le contrôlleur
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
//ce contrôller a besoin de deux fonctions, deux middlewares. Il y aura la fonction signup pour l'enrgistrement de nouveaux utilisateurs
// la premiere chose que l'on fait on va hasher le mot de passe (cad le crypter), il s'agit d'une fonction asynchrone
exports.signup = (req, res, next) => {
    //On appel donc bcrypt, on lui passe le mdp du corp de la requete transmis par le front end. On fait 10 tour de l'algorythme afin de créer un mdp securisé (saler le mdp). Avec le hash crér par bcrypt on va ensuite enregistrer le user dans la base de donnée
    bcrypt.hash(req.body.password, 10)
        //nous créons un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse de réussite en cas de succès.
        .then(hash => {
            // On compare dans un premier temps si un compte a déjà été créé avec l'adresse mail fournie. Si oui on envoi un message, si non on créé le compte
            const user = new User({
                // on utilise les champs créer dans le modèle
                email: req.body.email,
                 password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !"}))
                .catch(() => res.status(400).json({ error }));
        })
            
        .catch(() => res.status(500).json({ error }));
};


// et  une fonction login pour connecter des utilisateurs existants.Elle nous permet de verifier si un utilisateur existe dans notre base de données et si le mdp est conforme.
exports.login = (req, res, next) => {
    // On va chercher la méthode findOne de notre classe User, on lui passe un objet qui va servir de selecteur,cad le champ email avec la valeur transmise par le front end
    User.findOne({email: req.body.email})
        //on récupère la valeur trouvée par notre requête et on regarde si elle est null
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "login/mot de passe incorrect !"});
            }
            //Puis on compare le mdp avec la méthode de bcrypt. On compare ce qui a été recupéré du client avec notre base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ message: "login/mot de passe incorrect !"});
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            // On met en place le token, on utilise la fonction 'sign' de jsonwebtoken pour chiffrer un nouveau token.
                            token: jwt.sign(
                                //Ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token).
                                { userId: user._id},
                                //une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour crypter notre token 
                                "RANDOM_TOKEN_SECRET",
                                { expiresIn: "24h" }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};