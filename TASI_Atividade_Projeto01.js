/* *******************************************************
UNICSUL - Universidade Cruzeiro do Sul - Santo Amaro
ADS - Noturno
TASI - Professor Vinicius Heltai
Autor: Matheus Somensari Moreira da Silva
Data de Criação: 30/03/2024
******************************************************** */

const http = require('http');      
const url  = require('url');        

// Porta do Servidor
const PORT = 5678;

const server = http.createServer((req, res) => { 
  
    const reqUrl = url.parse(req.url, true);  
    const path   = reqUrl.pathname;           
    const query  = reqUrl.query;             

    if(path === '/'){
        res.writeHead(200, {'Context-Type':'text/plain; charset=utf-8'});
        res.end("End-Point: INDEX ('/')");

        // Caminho IMC
    }else if(path === '/imc'){
        const valorPeso   = parseFloat(query.peso);
        const valorAltura = parseFloat(query.altura);
        
        if(isNaN(valorAltura) || isNaN(valorPeso)){
            res.writeHead(400, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido");
        }else{
            
            const imc = valorPeso / (valorAltura*valorAltura);

   
            if(imc <= 19.5){
            
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso: ${valorPeso.toFixed(2)}Kg \nAltura: ${valorAltura.toFixed(2)} \nIMC: ${imc.toFixed(2)} - Abaixo do Peso`);
            }else if(imc <= 25){
                
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso: ${valorPeso.toFixed(2)}Kg \nAltura: ${valorAltura.toFixed(2)} \nIMC: ${imc.toFixed(2)} - Peso Normal`);
            }else if(imc <= 30){
                
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso: ${valorPeso.toFixed(2)}Kg \nAltura: ${valorAltura.toFixed(2)} \nIMC: ${imc.toFixed(2)} - Sobre Peso`);
            }else if(imc <= 35){
                
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso: ${valorPeso.toFixed(2)}Kg \nAltura: ${valorAltura.toFixed(2)} \nIMC: ${imc.toFixed(2)} - Obesidade I`);
            }else if(imc <= 40){
                
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso: ${valorPeso.toFixed(2)}Kg \nAltura: ${valorAltura.toFixed(2)} \nIMC: ${imc.toFixed(2)} - Obesidade II`);
            }else{
                
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso: ${valorPeso.toFixed(2)}Kg \nAltura: ${valorAltura.toFixed(2)} \nIMC: ${imc.toFixed(2)} - Obesidade III`);
            }
        }

        // Caminho Notas
    }else if(path === '/notas'){
        
        const notaA1 = parseFloat(query.a1);
        const notaA2 = parseFloat(query.a2);
        const media  = parseFloat(query.med);

        
        if (isNaN(notaA1) || isNaN(notaA2) || isNaN(media)){
            res.writeHead(400, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor válido");
        }else{
            
            calculo = (notaA1 + notaA2)/2;

            
            if(calculo >= media){
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Considerando notas: \nA1: ${notaA1.toFixed(2)} \nA2: ${notaA2.toFixed(2)} \nMedia: ${calculo.toFixed(2)} - Aprovado`);
            }else{
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Considerando notas: \nA1: ${notaA1.toFixed(2)} \nA2: ${notaA2.toFixed(2)} \nMedia: ${calculo.toFixed(2)} - Reprovado`);
            }
        }

        // Caminho Dólar
    }else if(path === '/dolar'){
        
        const valorDolar = parseFloat(query.dolar);  
        const valorReais = parseFloat(query.reais);  

        if(isNaN(valorDolar) || isNaN(valorReais)){
            res.writeHead(400, {'Context-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido ...")
        }else{
            
            const convertido = valorReais / valorDolar;

            
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(`R$: ${valorReais.toFixed(2)} por U$: ${valorDolar.toFixed(2)} 
                    é igual U$: ${convertido.toFixed(2)} convertidos`);
        }
    }else{
        res.writeHead(404, {'Context-Type':'text/plain; charset=utf-8'});
        res.end("404 - Pagina não encontrada ...")
    }
});

// Configuração do Servidor:
server.listen(PORT, () => {          
    console.log(`[OK] - Servidor iniciado em porta: ${PORT}`); 
});

//http://localhost:5678/imc
//http://localhost:5678/notas
//http://localhost:5678/dolar
