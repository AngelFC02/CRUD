'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: String,
  lastname: String,
  dni: Number,
  tarjeta: Number,
  genero: String,
  saldo: Number,
  maxRetiro: Number,
  retiro: Number,
  intentos: Number,
  fecha: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Usuarios', UserSchema)
