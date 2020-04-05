const express = require('express');
const fs = require('fs');

const app = express();         
var sha1 = require('sha1');
 
var answer = {};

fs.readFile('answer.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
        answer = JSON.parse(data);
        
        answer.decifrado = descripto(answer.cifrado, answer.numero_casas);
        
        answer.resumo_criptografico =  sha1(answer.decifrado);
        json = JSON.stringify(answer); 
        fs.writeFile('answer.json', json, 'utf8', callback); 
}});

function callback(){
    console.log('Arquivo Atualizado');
}

function descripto(frase, numero_casas){
    const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var fraseCompleta = '';

    for (var i=0; i< frase.length ; i++) {
        var letra = frase.charAt(i);
        
        for (var j=0; j<alfabeto.length; j++){
           
            if(j<numero_casas && letra===alfabeto[j]){
                //console.log(alfabeto[26-(numero_casas-j)]);
                fraseCompleta = fraseCompleta + alfabeto[26-(numero_casas-j)];
                break
            }else if(letra===alfabeto[j]){
               
                //console.log(alfabeto[j-numero_casas]);
                fraseCompleta = fraseCompleta + alfabeto[j-numero_casas];
                break
               
            }
            else if (j==25){
                //console.log(letra);
                fraseCompleta = fraseCompleta + letra;
            }
            
        }
        
     }
     
return fraseCompleta;

};

app.listen(3333, () =>console.log('Servidor rodando'));

