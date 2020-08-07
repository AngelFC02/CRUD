'use strict'

const Producto = require('../models/productos')

function postProduct (req, res) {
  console.log(req.body)
  const producto = new Producto()
  producto.nombre = req.body.nombre
  producto.tipo = req.body.tipo
  producto.marca = req.body.marca
  producto.precio = req.body.precio
  producto.stock = req.body.stock
  producto.save((err, producto) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos${err}` }) }
    if (!producto) { return res.status(404).send({ message: 'No se encuentra el producto' }) }
    res.status(200).send({ producto })
  })
}
function putProduct (req, res) {
  const productoId = req.params.productoId
  const update = req.body
  Producto.findByIdAndUpdate(productoId, update, (err, productoUpdate) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos${err}` }) }
    if (!productoUpdate) { return res.status(404).send({ message: 'No se encuentra el producto' }) }
    res.status(200).send({ message: 'Se actualizó correctamente' })
  })
}
function putEstado (req, res) {
  const productoId = req.params.productoId
  const update = req.body
  Producto.findByIdAndUpdate(productoId, update, (err, productoUpdate) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos${err}` }) }
    if (!productoUpdate) { return res.status(404).send({ message: 'No se encuentra el producto' }) }
    res.status(200).send({ message: 'Se actualizó correctamente' })
  })
}
function getProducts (req, res) {
  Producto.find((err, productos) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos${err}` }) }
    if (!productos) { return res.status(404).send({ message: 'No se encuentra el producto' }) }
    res.status(200).send({ productos })
  })
}
function getProduct (req, res) {
  const productoId = req.params.productoId
  Producto.findById(productoId, (err, producto) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos${err}` }) }
    if (!producto) { return res.status(404).send({ message: 'No se encuentra el producto' }) }
    res.status(200).send({ producto })
  })
}
function deleteProduct (req, res) {
}

module.exports = {
  postProduct,
  putProduct,
  putEstado,
  getProduct,
  getProducts,
  deleteProduct
}
