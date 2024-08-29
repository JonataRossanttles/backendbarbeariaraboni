const express = require('express')
const app = express()
const router = express.Router()
const controles = require('../controles/control')


router.post('/', controles.agendar)

router.post('/date', controles.data)

router.post('/consulta',controles.consultar)

router.post('/delete', controles.deletar)

setInterval(() => {
    fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/agendamento.json`)
    .then(response=>response.json()).
       then(data=> {}) 
}, 300000);

module.exports = router
