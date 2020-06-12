const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const anuncioModel = new Schema({
    nome: {
        type: String,
        required: true
    },

    contato: {
        type: String,
        required: true
    },

    hora_aula: {
        type: String

    },

    ativo: {
        type: Boolean,
        required: true
    },

    foto: {
        type: String
    },

    formacao: {
        type: String,
        required: true
    },

    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },

    endereco: {
        type: String,
        required: true
    },

    data: {
        type: Date,
        default: Date.now()
    }

})


anuncioModel.pre('save', next => {
    let now = new Date();
    if (!this.data) {
        this.data = now;
    }
    next();
})

module.exports = mongoose.model('Anuncio', anuncioModel)