// INICIANDO ==========================================
var express  = require('express');
// cria nossa aplicação Express
var app      = express();
// mongoose for mongodb
// var mongoose = require('mongoose');
// solicitações para log no console (express4)
var logger = require('morgan');
// puxar informações por POST HTML (express4)
var bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
var methodOverride = require('method-override');

// DEFININDO A APLICAÇÃO ==============================
// definindo local de arquivos públicos
app.use(express.static(__dirname + '/public'));
//app.use(express.static('/opt/openboard/library/applications/plot-board.wgt/public'));

//var path = require('path');
//app.use(express.static(path.join(__dirname, 'public')));
//console.log(__dirname);

//app.use('/opt/openboard/library/applications/plot-board.wgt/', express.static('public'))

// logando todas as requisições no console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// ROTAS ===============================================
// Incluindo nossas rotas definidas no arquivo routes/index.js
var index = require('./routes/index');
// definindo nossas rotas na aplicação
app.use('/', index);

// LISTEN (iniciando nossa aplicação em node) ==========
// Define a porta 1185 onde será executada nossa aplicação
app.listen(1185);
// Imprime uma mensagem no console
console.log("Aplicação executada na porta 1185");