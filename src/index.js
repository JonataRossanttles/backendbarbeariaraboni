const express = require('express')
const app = express()
const router = require('./rotas/router')
const port = 5000

app.use(express.json())
app.use('/agendamento',router)



app.listen(port,()=>{
    console.log('port 100%')
})