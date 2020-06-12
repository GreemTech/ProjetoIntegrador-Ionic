require('../models/usuariomodel.js');
const base = require('../bin/base/repository-base.js');

const md5 = require('md5');


class usuarioRepository {

    constructor() {
        this._base = new base('Usuario');
        this._projection = 'nome email _id';
        this._all = 'nome email _id formacao estado cidade endereco'
    }

    async IsEmailExite(email) {
        return await this._base._model.findOne({ email: email }, this._projection);
    }
    async authenticate(email, Senha) {
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: email, senha: _hashSenha }, this._projection);
    }

    async create(data) {
        let usuarioCriado = await this._base.create(data);
        return this._base._model.findById(usuarioCriado._id, this._projection);
    }

    async update(id, data) {
        let usuarioAtualizado = await this._base.update(id, {
            nome: data.nome,
            email: data.email,
            cidada: data.cidade,
            endereco: data.endereco,
            formacao: data.formacao,
            estado: data.estado
                //foto: data.foto
        });
        return this._base._model.findById(usuarioAtualizado._id, this._projection).lean()
    }

    async getAll() {
        return await this._base._model.find({}, this._all).lean();
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome email _id estado formacao').lean();
    }

    async delete(id) {
        return await this._base.delete(id);
    }

}

module.exports = usuarioRepository;