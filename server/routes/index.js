'use strict'

const express = require('express')
const UsuarioCtrl = require('../controlllers/usuarios')
const api = express.Router()

api.post('/usuario/', UsuarioCtrl.CreateUsuario)
api.get('/usuario/', UsuarioCtrl.GetUsuarios)
api.get('/usuario/:usuarioId', UsuarioCtrl.GetUsuarios)
api.put('/usuario/:usuarioId', UsuarioCtrl.UpdateUsuario)
api.delete('/usuario/:usuarioId', UsuarioCtrl.DeleteUsuario)

module.exports = api
