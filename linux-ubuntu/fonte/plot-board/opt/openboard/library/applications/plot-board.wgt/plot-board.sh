#!/bin/bash

case "$1" in
    start)
        echo "Iniciando o servico plot-board..."
        sudo node /opt/openboard/library/applications/plot-board.wgt/server.js
        ;;
 
    stop)
        echo "Parando servico plot-board..."
        sudo kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')
        ;;
 
    restart)
        echo "Reiniciando serviço..."
        sudo kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')
        sudo node /opt/openboard/library/applications/plot-board.wgt/server.js
        ;;
 
    *)
        echo "Operação inválida"
        ;;
esac