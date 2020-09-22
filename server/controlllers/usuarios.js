'use strict'
const Usuario = require('../models/usuarios')

async function CreateUsuario (req, res) {
  console.log(req.body)
  const usuario = new Usuario()
  usuario.nombre = req.body.nombre
  usuario.apellido = req.body.apellido
  usuario.dni = req.body.dni
  usuario.tarjeta = req.body.tarjeta
  usuario.genero = req.body.genero
  usuario.saldo = req.body.saldo
  usuario.maxRetiro = req.body.maxRetiro
  usuario.retiro = req.body.retiro
  usuario.intentos = req.body.intentos
  try {
    const data = await usuario.save()
    return res.status(200).send({ data })
  } catch (error) {
    return res.status(500).send({ message: `Error en la base de datos ${error}` })
  }
}
async function GetUsuarios (req, res) {
  try {
    const data = await Usuario.find({ }).exec()
    if (data.length === 0) { res.status(404).send({ message: 'no se encuentra datos' }) }
    return res.status(200).send({ data })
  } catch (error) {
    if (error) { res.status(500).send({ message: `Error en la base de datos ${error}` }) }
  }
}

async function GetUsuario (req, res) {
  const usuarioId = req.params.usuarioId
  try {
    const IdCliente = await Usuario.findOne({ _id: usuarioId }).exec()
    if (!IdCliente) { return res.status(404).send({ message: 'no se enconstraron productos' }) }
    res.status(200).send({ data: IdCliente, message: 'Se encontro con exito' })
  } catch (error) {
    return res.status(500).send({ message: `Error en la base de datos ${error}` })
  }
}

async function GetUsuarioCajero (req, res) {
  const NTarjeta = req.query.queryFront
  try {
    const tarjeta = await Usuario.findOne({ tarjeta: NTarjeta }).exec()
    console.log(tarjeta, 'getusuariostarjeta')
    if (!tarjeta) { return res.status(404).send({ message: 'no se encontro tarjeta' }) }
    return res.status(200).send({ data: tarjeta, message: 'Datos Validos!!!!!!!!!!!!' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: `Error BD ${error}` })
  }
}

async function buscarItems (req, res) {
  const BuscarItem = req.query.queryNombre
  console.log(BuscarItem, 'back')
  try {
    // , dni: { $regex: `.*${BuscarItem}.*`, $options: 'i' }
    const Buscar = await Usuario.find({ nombre: { $regex: `.*${BuscarItem}.*`, $options: 'i' } }).exec()
    console.log(Buscar)
    if (!Buscar) { return res.status(404).send({ message: 'no se encontraron resultados' }) }
    return res.status(200).send({ data: Buscar, message: 'busqueda exitosa' })
  } catch (error) {
    return res.status(500).send({ message: `Error BD ${error}` })
  }
}

function UpdateUsuario (req, res) {
  const usuarioId = req.params.usuarioId
  const update = req.body
  Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!usuarioUpdate) { return res.status(404).send({ message: 'No se encontro el producto' }) }
    res.status(200).send({ message: 'Se actualizaron los datos' })
  })
}

async function UpdateEstado (req, res) {
  const usuarioId = req.params.usuarioId
  const update = req.body
  try {
    const data = await Usuario.findByIdAndUpdate(usuarioId, update)
    if (!data) { return res.status(404).send({ message: 'No se encuentra el usuario' }) }
    res.status(200).send({ message: 'actualizado correctamente' })
  } catch (error) {
    return res.status(500).send({ message: `Error en la base de datos ${error}` })
  }
}

async function DeleteUsuario (req, res) {
  const usuarioId = req.params.usuarioId
  try {
    const data = await Usuario.findById({ _id: usuarioId }).exec()
    if (!data) { return res.status(404).send({ message: 'No se encuentra el usuario' }) }
    await data.remove()
    res.status(200).send({ message: 'eliminado correctamente' })
  } catch (error) {
    if (error) { return res.status(500).send({ message: `Error en la base de datos ${error}` }) }
  }
}

module.exports = {
  CreateUsuario,
  GetUsuario,
  GetUsuarios,
  UpdateUsuario,
  DeleteUsuario,
  UpdateEstado,
  GetUsuarioCajero,
  buscarItems
}
