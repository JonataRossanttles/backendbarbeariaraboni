const express = require('express')
const app = express()
const rotasadm = express.Router()
const controlesadm= require('../controles/controladm')
require('dotenv').config()

rotasadm.post('/',controlesadm.adm)


module.exports = rotasadm


