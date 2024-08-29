const  controles = {
    consultar: (req,resp)=>{

        const ticket = req.body.id
    
        fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/agendamento/.json`)
        .then(response=>{if(!response.ok){
            return resp.status(400).json({message:'Requisição falhou'})
        }else{
           return response.json()
        }
    }).
           then(dados=> { 
            const chaves = Object.values(dados)
            const obj = {...chaves[0],...chaves[1]}
    
            if(ticket in obj){
                const nome = obj[ticket].nome
                const celular = obj[ticket].celular
                const corte = obj[ticket].corte
                const barbeiro = obj[ticket].barbeiro
                const  date = obj[ticket].data
                const  hora = obj[ticket].hora
                const dadosenv = {nome:nome,celular:celular,corte:corte,barbeiro:barbeiro,data:date,hora:hora}
                return resp.status(200).json(dadosenv)
                
    
            }else{
               return resp.status(400).json({ message: 'Nenhum dado encontrado no banco de dados.' })
               
            }
                   }) 
           .catch(error => {
            console.error('Erro:', error);
            resp.status(500).send('Erro no servidor'); // Enviar uma resposta de erro ao cliente
        });
    
    
    },
    agendar: (req,resp)=>{

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
            resp.status(400).json({mensagem:'Preencha todos os campos!'})
        }else{
            fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com//agendamento/${namebarb}.json`,{method:'POST',
                headers:{'Content-Type':'Application/json'},
               body:JSON.stringify(data)}).
               then(response=>{if(!response.ok){
                return resp.status(400).json({message:'Requisição falhou'})
            }else{
               return response.json()
            }
        }).
               then(data=> {resp.status(200).json({message:true,id:data.name})}) 
               .catch(error => {
                resp.status(500).json({message:'Erro no servidor'}); // Enviar uma resposta de erro ao cliente
            });
            
        }
        
       
    },
    data: (req,resp)=>{
   
        const namebarb = req.body.barbeiro
        
        fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/agendamento/${namebarb}.json`)
        .then(response=>{if(!response.ok){
            return resp.status(400).json({message:'Requisição falhou'})
        }else{
           return response.json()
        }
    }).
           then(data=> { 
                const date = req.body.data
                const valores = Object.values(data)
                const objdate = valores.filter((element)=>{return element.data == date}) // Filtrar pela data escolhida pelo cliente
                const horas = objdate.map((element)=>{return {hora_formatada:element.hora}}) // trazer os horários para aquela data
                resp.status(200).json(horas)
        }) 
           .catch(error => {
            console.error('Erro:', error);
            resp.status(500).json({message:'Erro no servidor'}); // Enviar uma resposta de erro ao cliente
        });
    
    
    },
    deletar: (req,resp)=>{
        const namebarb = req.body.barbeiro
        const ticket = req.body.id
        fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/agendamento/.json`)
        .then(response=>{if(!response.ok){
            return resp.status(400).json({message:'Requisição falhou'})
        }else{
           return response.json()
        }
    }).
           then(dados=> { 
            const chaves = Object.values(dados)
            const obj = {...chaves[0],...chaves[1]}
    
            if(ticket in obj){
              
                fetch(`https://barbeariaraboni-eb7b4-default-rtdb.firebaseio.com/agendamento/${namebarb}/${ticket}.json`,
                    {method:'DELETE'})
                .then(response=>response.json())
                   .catch(error => {
                    console.error('Erro:', error);
                    resp.status(500).json({messagem: 'Erro no servidor!'}); // Enviar uma resposta de erro ao cliente
                });
                return resp.status(200).json({messagem: 'Agendamento excluído com sucesso!'})
            }else{
               return resp.status(400).json({messagem: 'Ticket não encontrado para exclusão!'})
               
            }
                   }) 
    
    
    },
    


}

module.exports = controles;