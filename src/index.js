const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./rotas/router')
const rotaslogin = require('./rotas/login')
const rotasadm = require('./rotas/adm')
const port = 5000
const corsoption = {

    origin:'https://barbeariaraboni.vercel.app'
}

    
app.use(cors(corsoption));
app.use(express.json())
app.use('/agendamento',router)
app.use('/login',rotaslogin)
app.use('/adm',rotasadm)

app.listen(port,()=>{
    console.log(`Back rodando na porta ${port}`)
})
