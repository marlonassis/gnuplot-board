// public/angularApp.js

//Criamos um módulo Angular chamado formularioGrafico
var formularioGrafico = angular.module('formularioGrafico', []);

function mainController($scope, $http) {    

    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var requisitarDados = function (){
        $http.get('/api/requisitar/dados').success(function(data) {
                //alert(data.configuracoes);
                $scope.formulario = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    requisitarDados();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.gerarGrafico = function() {
        $http.post('/api/gerar/grafico', $scope.formulario)
            .success(function(imagem) {
	        $scope.formulario.nomeGrafico = imagem;
		//requisitarDados();
		location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.adicionarArquivosDados = function() {
        $scope.formulario.configuracoes += "\nplot \"data/dados.dat\""
    };
}