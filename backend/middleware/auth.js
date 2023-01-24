// On importe jsonwentoken
const jwt = require("jsonwebtoken");

// On exporte une fonction qui sera notre middlware
module.exports = (req, res, next) => {
    try {
        //On récupère d'abord le token, avec le token
        const token = req.headers.authorization.("")[1];
        //On utilise la fonction verify pour décoder notre token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Nous extrayons l'ID utilisateur de notre token et le rajoutons à l’objet Request afin que nos différentes routes puissent l’exploiter.
        const userId = decodedToken.userId;
            req.auth = {
                userId: userId
            };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};