'use strict'

const express = require('express')
const UsuarioCtrl = require('../controlllers/usuarios')
const ClienteCtrl = require('../controlllers/clientes')
const ProductoCtrl = require('../controlllers/productos')
const api = express.Router()

api.post('/usuario', UsuarioCtrl.CreateUsuario)
api.get('/usuario', UsuarioCtrl.GetUsuarios)
api.get('/usuario/:usuarioId', UsuarioCtrl.GetUsuario)
api.put('/usuario/:usuarioId', UsuarioCtrl.UpdateUsuario)
api.put('/usuario/:usuarioId', UsuarioCtrl.UpdateEstado)
api.delete('/usuario/:usuarioId', UsuarioCtrl.DeleteUsuario)

api.post('/cliente', ClienteCtrl.postCliente)
api.get('/cliente', ClienteCtrl.getClientes)
api.get('/cliente/:clienteId', ClienteCtrl.getCliente)
api.put('/cliente/:clienteId', ClienteCtrl.updateCliente)
api.put('/estado/:clienteId', ClienteCtrl.updateEstado)
api.delete('/cliente/:clienteId', ClienteCtrl.deleteCliente)

api.post('/producto', ProductoCtrl.postProduct)
api.get('/producto', ProductoCtrl.getProducts)
api.get('/producto/:productoId', ProductoCtrl.getProduct)
api.put('/producto/:productoId', ProductoCtrl.putProduct)
api.put('/productoEstado/:productoId', ProductoCtrl.putEstado)
api.delete('/producto/:productoId', ProductoCtrl.deleteProduct)

module.exports = api
