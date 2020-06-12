require('../models/usuariomodel.js')
const mongoose = require('mongoose')
const usuario = mongoose.model('Usuario')
const bodyParser = require('body-parser')
const validation = require('../bin/helpers/validation.js')
const repositoryBase = require('../repositories/usuario-repository.js')
const controllerBase = require('../bin/base/controller-base.js')
const _repo = new repositoryBase();
const _validationContract = new validation();
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const variavel = require('../bin/configuration/variaveis.js')
    //


function usuarioController() {

}

//usuarioController.prototype.get = async(req, res) => {
//   let _hasSenha = md5(senha)

//}


usuarioController.prototype.post = async(req, res) => {

    // new usuario(req.body).save().then(() => {
    //  console.log("cadastrado com sucesso")
    //  }).catch((e) => {
    //    console.log("erro" + e)
    //  })
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é invalido');
    _validationContract.isRequired(req.body.senha, 'Senha informada é invalida');
    // _validationContract.isRequired(req.body.senhaConfirmacao, 'Senha é obrigatoria');
    //_validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'As senhas não estão iguais');
    if (req.body.email) {
        let usuarioExiste = await _repo.IsEmailExite(req.body.email)
        if (usuarioExiste) {
            _validationContract.isTrue((usuarioExiste.nome != undefined), 'já existe esse e-mail')
        }
    }
    if (req.body.senha) {
        req.body.senha = md5(req.body.senha)
    }
    controllerBase.post(_repo, _validationContract, req, res)
        // let resultado = await _repo.create(req.body)
        //res.status(201).send(resultado);

}

usuarioController.prototype.put = async(req, res) => {
    let _validationContract = new validation();

    let usuarioExiste = await _repo.IsEmailExite(req.body.email)
    if (usuarioExiste) {
        _validationContract.isTrue((usuarioExiste.nome != undefined) && (usuarioExiste._id != req.params.id), 'já existe esse e-mail')
    }

    controllerBase.put(_repo, _validationContract, req, res)
        // let resultado1 = await _repo.update(req.params.id, req.body)
        // await usuario.findByIdAndUpdate(req.params.id, { $set: req.body }).lean();
        // let usuarioEncontrado = await usuario.findById(req.params.id);
        // res.status(202).send(resultado1);

}


usuarioController.prototype.get = async(req, res) => {
    controllerBase.get(_repo, req, res)
        //let lista = await _repo.getAll();
        // let lista = await usuario.find().lean();
        //res.status(200).send(lista);

}

usuarioController.prototype.getByid = async(req, res) => {
    controllerBase.getById(_repo, req, res)
        // let lista1 = await _repo.getByid(req.params.id)
        //let lista1 = await usuario.findById(req.params.id).lean();
        // res.status(200).send(lista1);
}

usuarioController.prototype.delete = async(req, res) => {
    controllerBase.delete(_repo, req, res)
        // let deletado = await _repo.delete(req.params.id)
        // let deletado = await usuario.findByIdAndRemove(req.params.id).lean()
        //  res.status(204).send(deletado);
}

usuarioController.prototype.autenticar = async(req, res) => {


    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'Informe seu email');
    _validationContract.isEmail(req.body.email, 'Informe um e-mail valido');
    _validationContract.isRequired(req.body.senha, 'Informe sua senha');

    if (!_validationContract.isValid()) {
        res.status(400).send({ messagem: "não foi possivel efetuar o login", validation: _validationContract.errors() })
        return;
    }

    let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);

    if (usuarioEncontrado) {
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign({ user: usuarioEncontrado }, variavel.security.securitykey)
        })
    } else {
        res.status(404).send({ message: "Usuário não encontrado" })
    }

}

module.exports = usuarioController