const jwt = require('jsonwebtoken')

const  controleslogin = {
    logincadastro:(req,resp)=>{

        const nome = req.body.nome
        const email = req.body.email
        const senha = req.body.senha
        
    fetch('https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/useradm.json').
    then(response=>{if(!response.ok){
        return resp.status(400).json({message:'Requisição falhou'})
    }else{
       return response.json()
    }
    } ).then(dados=>{
    // Validar se o email e senha passados estão no banco
    const values = Object.values(dados)
    const obj = values.find((element)=> { return element.email == email})
    // Caso o e-mail não esteja cadastrado no banco prosseguir com o cadastro do usuário.
    if(obj == undefined){
        fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/useradm/.json`,{method:'POST',
            headers:{'Content-type':'Application/json'}, 
            body:JSON.stringify({nome:nome,email:email,senha:senha}) 
        })
        .then(response=> {if(response.ok){
            const token = jwt.sign({email:email},process.env.TOKEN_SECRET,{expiresIn: 3600 })
            return resp.header('tokenid', token).send()
            }else{
            resp.status(400).json({message:'Não foi possível realizar o cadastro, tente novamente mais tarde!'})
        }
    })
    // Caso o E-mail seja encontrado, retorna resposta de erro.
    }else{
        resp.status(400).json({message:'Usuário já existe! tente outro E-mail e senha.'})
    }
    
    }
    ).catch((erro)=>resp.status(400).json({message:`Erro no servidor! ${erro}`}))
    
    },
    authlogin: (req,resp)=>{
        const email = req.body.email
        const senha = req.body.senha
      
        fetch('https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/useradm.json').
        then(response=>{if(!response.ok){
            return resp.status(400).json({message:'Requisição falhou'})
        }else{
           return response.json()
        }
    }).
        then(dados=>{
            // Validar se o email e senha passados estão no banco
            const values = Object.values(dados)
             const obj = values.find((element)=> { return element.email == email && element.senha == senha})
             
            // Gera um token caso ache e envia para o usuário
            if(obj != undefined){
                
                const token = jwt.sign({email:email},process.env.TOKEN_SECRET,{expiresIn: 3600 })
                return resp.header('tokenid', token).json({nome:obj.nome})
    
            }else{
                // Mensagem de erro caso não encontre
                return resp.status(400).json({message:'Usuário/senha incorreta!'})
            }
            
        }).catch((erro)=>{
            resp.status(500).json({message:`Erro no servidor! ${erro}`})
        })
    
    
    
    },
    consulta: (req,res)=>{
        try{
                
       
        const token = req.headers.authorization
        if(!token){
            res.status(400).json({message:'Token não fornecido!'})
        }else{
            const result =  jwt.verify(token,process.env.TOKEN_SECRET)
            if('exp' in result){
                
                res.status(200).header('authorization','true').send()
            }
        }
     } catch{
        res.status(400).header('authorization','false').json({message:'token expirado!'})
        }
        
        
    }

}

module.exports = controleslogin;