const express = require('express')
const app = express()
const rotaslogin = express.Router()
const controleslogin = require('../controles/logincontrol')
require('dotenv').config()

rotaslogin.post('/cadastro',controleslogin.logincadastro)

rotaslogin.post('/auth', controleslogin.authlogin)

rotaslogin.post('/consulta', controleslogin.consulta)

module.exports = rotaslogin


