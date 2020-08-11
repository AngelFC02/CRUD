'use strict'

const Cliente = require('../models/clientes')

function postCliente (req, res) {
  console.log(req.body)
  const cliente = new Cliente()
  cliente.nombre = req.body.nombre
  cliente.apellido = req.body.apellido
  cliente.edad = req.body.edad
  cliente.dni = req.body.dni

  cliente.save((err, cliente) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!cliente) { return res.status(404).send({ message: 'No se encontro cliente' }) }
    res.status(200).send({ cliente })
  })
}
function updateCliente (req, res) {
  const clienteId = req.params.clienteId
  const update = req.body
  Cliente.findByIdAndUpdate(clienteId, update, (err, clienteUpdate) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!clienteId) { return res.status(404).send({ message: 'No se enncontro el cliente' }) }
    res.status(200).send({ message: 'Se actualizó correctamente' })
  })
}
function updateEstado (req, res) {
  const clienteId = req.params.clienteId
  const update = req.body
  console.log(update)
  Cliente.findByIdAndUpdate(clienteId, update, (err, clienteUpdate) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!clienteId) { return res.status(404).send({ message: 'No se enncontro el cliente' }) }
    res.status(200).send({ message: 'Se actualizó correctamente' })
  })
}
function getClientes (req, res) {
  Cliente.find((err, cliente) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!cliente) { return res.status(404).send({ message: 'No se encuentra el cliente' }) }
    res.status(200).send({ cliente })
  })
}
function getCliente (req, res) {
  const clienteId = req.params.clienteId
  Cliente.findById(clienteId, (err, cliente) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!cliente) { return res.status(404).send({ message: 'No se encontró el producto' }) }
    res.status(200).send({ cliente })
  })
}
function deleteCliente (req, res) {
  const clienteId = req.params.clienteId
  Cliente.findById(clienteId, (err, cliente) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!cliente) { return res.status(404).send({ message: 'No se encontro el cliente' }) }
    cliente.remove((err) => {
      if (err) { res.status(500).send({ message: `Error en la base de datos ${err}` }) }
      res.status(200).send({ message: 'El cliente fue eliminado' })
    })
  })
}

module.exports = {
  postCliente,
  updateCliente,
  updateEstado,
  getClientes,
  getCliente,
  deleteCliente
}
