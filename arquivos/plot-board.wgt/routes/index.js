// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var router = express.Router();
var fs = require('fs');
var diretorio = '/opt/openboard/library/applications/plot-board.wgt';

// ROTA REQUISITAR DADOS INICIAIS ============================================
router.get('/api/requisitar/dados', function(req, res) {
    var configuracoes = fs.readFileSync(diretorio + '/data/gnuplot.conf').toString();
    var dados = fs.readFileSync(diretorio + '/data/dados.dat').toString();
    var log = fs.readFileSync(diretorio + '/data/console.log').toString();
    //excluindo a instrucao que determina o arquivo de saida do grafico 
    var linhas = configuracoes.toString().split("\n");
    configuracoes = '';
    for(i = 0; i < linhas.length; i++){
        if(linhas[i].indexOf("output") == -1){
	    configuracoes += linhas[i] + "\n";
	}
    }

    var params = {
        dados: dados,
	configuracoes: configuracoes,
	nomeGrafico : "graficoPadrao.png?" + new Date().getTime(),
        log : log
    } 
    
    res.json(params); 
});

var exec = require('child_process').exec;

// ROTA GERAR GRAFICO =============================================
router.post('/api/gerar/grafico', function(req, res) {
    var dados = req.body.dados;
    var configuracoes = req.body.configuracoes;

    //excluindo a instrucao que determina o arquivo de saida do grafico, caso o usuario tenha indicado
    var linhas = configuracoes.toString().split("\n");
    configuracoes = '';
    for(i = 0; i < linhas.length; i++){
        if(linhas[i].indexOf("output") == -1){
	    configuracoes += linhas[i] + "\n";
	}
    }
    configuracoes = "set output \"public/graficoPadrao.png\"\n" + configuracoes;


    //procura pela instrucao terminal 
    var achouTerminal = false;
    linhas = configuracoes.toString().split("\n");
    for(i = 0; i < linhas.length; i++){
        if(linhas[i].indexOf("terminal") >= 0){
	    achouTerminal = true;
	    break;
	}
    }

    if(!achouTerminal){
        configuracoes = "set terminal png truecolor\n" + configuracoes;   
    }
    
    //atualizar arquivos
    fs.writeFileSync(diretorio + "/data/gnuplot.conf", configuracoes.toString(), "utf8");
    fs.writeFileSync(diretorio + "/data/dados.dat", dados.toString(), "utf8");
    
    //interagir com o gnuplot
    var cmd = 'cat data/gnuplot.conf | gnuplot';
    exec(cmd, function(error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        var log = stdout + "\n" + stderr;
        fs.writeFileSync(diretorio + "/data/console.log", log, "utf8");
    });
    
    res.writeHead(200, {'Content-Type': 'html/text' });
    res.end("graficoPadrao.png?" + new Date().getTime());
});

// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('*', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end

    res.sendfile(diretorio + '/public/index.htm');
});

module.exports = router;