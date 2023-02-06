// On importe le package HTTPS natif de node pour créer un server
// on utilise le mot clé "require" pour importer les modules de base de Node.js sans avvoir besoin de spécifier le chemin
const http = require("http");

//On importe notre application
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();

const normalizePort = val => {
  const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    } 
    if (port >= 0) {
      return port;
    }
    return false;
  };
  
// On doit dire à l'app express sur quel port elle doit tourner
const port = normalizePort(process.env.PORT);
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
    console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
    console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  

// On passe cette application à norte server, 
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
console.log('Listening on ' + bind);
});

// On configure le server pour qu'il écoute via un port. soit par un port par defaut, soit par le port 3000
server.listen(process.env.PORT);