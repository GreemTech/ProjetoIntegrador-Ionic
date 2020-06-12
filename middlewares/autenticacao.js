const jwt = require('jsonwebtoken')
const variavel = require('../bin/configuration/variaveis.js')


module.exports = async(req, res, next) => {
    let token = req.body.token || req.query.query || req.headers['x-access-token'];

    if (token) {
        try {
            let decoded = await jwt.verify(token, variavel.security.securitykey);
            console.log(decoded)
            req.usuarioLogado = decoded;
            next();
        } catch (e) {
            res.status(401).send({ messagem: 'token informado é invalido' })
            return;
        }
    } else {
        res.status(401).send({ message: 'Você informar um token para acessar' })
        return;
    }
}