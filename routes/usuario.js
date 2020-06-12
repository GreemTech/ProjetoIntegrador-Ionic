const express = require('express')
const router = express.Router()
const controller = require('../controller/usuario-controller.js')
const auth = require('../middlewares/autenticacao.js')


let _crtl = new controller();

router.post('/autenticar', _crtl.autenticar)

router.get('/listar', _crtl.get)

router.get('/:id', auth, _crtl.getByid)

router.post('/register', _crtl.post)

router.put('/:id', auth, _crtl.put)

router.delete('/:id', auth, _crtl.delete)

module.exports = router