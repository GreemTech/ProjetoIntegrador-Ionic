const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const usuarioModel = new Schema({
    nome: {
        type: String,

    },

    email: {
        type: String,

    },

    senha: {

        type: String,

    },

    formacao: {
        type: String,

    },

    cidade: {
        type: String,

    },
    estado: {
        type: String,

    },

    endereco: {
        type: String,

    },

    data: {
        type: Date,
        default: Date.now()
    }

})

usuarioModel.pre('save', next => {
    let now = new Date();
    if (!this.data) {
        this.data = now;
    }
    next();
})

module.exports = mongoose.model('Usuario', usuarioModel)