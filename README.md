# Plot-Board
**Widget desenvolvido para plotar graficos na lousa digital OpenBoard**

[OpenBoard](https://github.com/OpenBoard-org)

O widget plot-board fornece a interface necessaria para que o usuario possa plotar graficos 
dentro da lousa digital OpenBoard. 

## Usando Plot-Board

Voce pode instalar o widget por copiar o diretorio plot-board.wgt para o diretorio applications 
do OpenBoard. Abra o OpenBoard e procure pelo widget plot-board na secao de aplicativos.

Para que funcione corretamente, e preciso que o gnuplot e o node.js estejam instalados. 
O plot-board utiliza esses dois programas para interpretar os dados informados pelo usuario e 
gerar o grafico para exibicao.

Para usuario linux (Ubuntu 16.04), e possivel utilizar o processo automatico por executar os 
comandos de instrucao no terminal segundo descrito abaixo. Antes de executar esses comandos 
lembre-se de baixar o pacote plot-board.deb que esta no diretorio linux-ubuntu/plot-board.deb.

    sudo apt-get install git qt5-default libqt5svg5-dev libqt5webkit5-dev libqt5xmlpatterns5-dev qtscript5-dev libssl-dev libpaper-dev libmotif-dev qtmultimedia5-dev qttools5-dev
    sudo dpkg -i openboard_ubuntu_16.04_1.3.6_amd64.deb
    sudo apt-get install gnuplot
    sudo apt-get install nodejs nodejs-legacy
    sudo dpkg -i plot-board.deb

Para desinstalar o plot-board utilize o seguinte comando:

    sudo apt-get purge plot-board

Para usuario windows e mac em breve disponibilizaremos suas versoes. Entretanto e possivel utilizar
este widget colocando-o no diretorio applications do OpenBoard e instalar o gnuplot e o node.js. 
Em seguida basta iniciar o node.js a partir do arquivo serve.js presente no diretorio do plot-board.widget
que se encontra dentro do diretorio applications do OpenBoard. 
