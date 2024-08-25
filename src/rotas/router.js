const express = require('express')
const app = express()
const router = express.Router()


router.post('/', (req,resp)=>{

    const namebarb = req.body.barbeiro
    const data = {
        nome:  req.body.nome,
        celular:  req.body.celular,
        barbeiro:  req.body.barbeiro,
        corte:  req.body.corte,
        data:  req.body.data,
        hora:  req.body.hora
    }

    if(req.body.nome == '' ||req.body.celular == '' ||req.body.barbeiro == '' ||req.body.corte == '' ||req.body.data == '' ||req.body.hora == '' ){
        resp.status(500).send(false)
    }else{
        fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/${namebarb}.json`,{method:'POST',
            headers:{'Content-Type':'Application/json'},
           body:JSON.stringify(data)}).then(response=>response.json()).
           then(data=> {resp.status(200).json({message:true,id:data.name})}) 
           .catch(error => {
            console.error('Erro:', error);
            resp.status(500).send('Erro no servidor'); // Enviar uma resposta de erro ao cliente
        });
        
    }
    
   
})

router.post('/date', (req,resp)=>{
   
    const namebarb = req.body.barbeiro
    
    fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/${namebarb}.json`)
    .then(response=>response.json()).
       then(data=> { 
        const date = req.body.data
        
            const valores = Object.values(data)
            const objdate = valores.filter((element)=>{return element.data == date}) // Filtrar pela data escolhida pelo cliente
            const horas = objdate.map((element)=>{return {hora_formatada:element.hora}}) // trazer os horários para aquela data
            resp.status(200).json(horas)

    }) 
       .catch(error => {
        console.error('Erro:', error);
        resp.status(500).send('Erro no servidor'); // Enviar uma resposta de erro ao cliente
    });


})

router.get('/consulta', (req,resp)=>{
    
    fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/.json`)
    .then(response=>response.json()).
       then(data=> { 
       resp.status(200).json(data)
               }) 
       .catch(error => {
        console.error('Erro:', error);
        resp.status(500).send('Erro no servidor'); // Enviar uma resposta de erro ao cliente
    });


})



module.exports = router
