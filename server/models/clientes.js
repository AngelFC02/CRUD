'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClienteSchema = Schema({
  nombre: String,
  apellido: String,
  edad: String,
  dni: Number,
  fecha: { type: Date, default: Date.now() },
  estado: { type: Boolean, default: true }
})

module.exports = mongoose.model('Clientes', ClienteSchema)
