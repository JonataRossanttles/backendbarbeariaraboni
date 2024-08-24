const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./rotas/router')
const port = 5000

app.use(cors());
app.use(express.json())
app.use('/agendamento',router)



app.listen(port,()=>{
    console.log('port 100%')
})