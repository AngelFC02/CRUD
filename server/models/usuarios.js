'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  nombre: String,
  apellido: String,
  dni: String,
  tarjeta: String,
  genero: String,
  saldo: Number,
  maxRetiro: Number,
  retiro: Number,
  intentos: Number,
  reporte: { type: Array, default: [] },
  fecha: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Usuarios', UserSchema)
