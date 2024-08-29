const jwt = require('jsonwebtoken')

const  controlesadm = {
    adm:(req,res)=>{
try{
            
    const token = req.headers.authorization
    const namebarb = req.body.barbeiro
    const data = req.body.data
    //validando o token
    if(!token){
        res.status(400).json({message:'Token não fornecido!'})
     }else{
        const result =  jwt.verify(token,process.env.TOKEN_SECRET)
        if('exp' in result){
            //Caso o token for valido a requisição é feita      
            fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/agendamento/${namebarb}.json`)
            .then(response=>{if(!response.ok){
                 return resp.status(400).json({message:'Requisição falhou'})
                }else{return response.json()}}).
                then(dados=>{
                    const obj = Object.values(dados)
                    const inf = obj.filter((element)=>{return element.data == data })
                    res.status(200).header('authorization','true').json(inf)
                })


                }
            }
} catch{
            res.status(400).header('authorization','false').json({message:'token expirado!'})
            }
    }
}

module.exports = controlesadm;