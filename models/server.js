const express = require("express"); 
const http = require('http'); 
const socketio = require("socket.io"); 
const path = require("path"); 
const Sockets = require("./sockets");


class Server { 
    constructor(){
        this.app = express(); 
        this.port = process.env.PORT;  

        //httpserver
        this.server = http.createServer(this.app); 

        //config de sockets
        this.io = socketio(this.server, {/** Configuraciones */}); 
    }


    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, "../public"))); 
    }

    configurarSockets(){
        new Sockets(this.io); 
    }

    execute(){

        //init middleware
        this.middlewares();
        
        //iniciar sockets
        this.configurarSockets();

        //init server
        this.server.listen(this.port, () =>{
            console.log("Server corriendo en puerto: ", this.port); 
        });
    }
}

module.exports = Server;