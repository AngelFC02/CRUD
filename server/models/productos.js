'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductoSchema = Schema({
  nombre: String,
  tipo: String,
  marca: String,
  precio: Number,
  stock: Number,
  estado: { type: Boolean, default: true }
})

module.exports = mongoose.model('Producto', ProductoSchema)
