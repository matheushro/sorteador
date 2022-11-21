const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000
const Sorteador = require('./classes/Sorteador.js');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
})

app.post('/sorteador', (req, res) => {
    
    const tipo = req.body.tipo;
    const num1 = req.body.inicial;
    const num2 = req.body.final;
    const nome = req.body.nomes;
    const ordem = req.body.ordem;
    const total = req.body.total;
    const sorteador = new Sorteador(tipo, num1, num2, nome, ordem, total);
    if(tipo == 1){
        min = Math.ceil(num1);
        max = Math.floor(num2);
        var array2 = [];
        for (let index = 0; index < total; index++) {
            numero = (Math.random() * (max - min) + min);
            array2[index] = parseInt(numero.toFixed(0));
        }
        
        if(ordem == 1){
            res.send(`${array2.sort(sorteador.compareNumbers)}`);
        }else{
            res.send(`${array2.sort(sorteador.compareNumbersDesc)}`);
        }
    }else{
        numberOfLineBreaks = (nome.match(/\n/g)||[]).length;
        if(numberOfLineBreaks > 0){
            var array1 = nome.split(/\r?\n|\r|\n/g);
        }else{
            var array1 = nome.split(';');
        }
        var sortear = '';
        array1.sort(() => Math.random() - 0.5)
        for (let index = 0; index < total; index++) {
            sortear = sortear.concat(array1[index]);
            if(index < total-1){
                sortear = sortear.concat(',');
            }
        }
        array2 = sortear.split(',');
        if(ordem == 1){
            res.send(`${array2.sort()}`);
        }else{
            res.send(`${array2.sort().reverse()}`);
        }
        
    }
})

app.listen(port, (error) => {
    if(error){
        console.log(`Servidor inativo ${port}`)
    }else{
        console.log(`Servidor ouvindo a porta: ${port}`)
    }
})