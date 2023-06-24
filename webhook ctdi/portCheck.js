const net = require('net');
const { exec } = require('child_process');

const path = 'index.js';
const port = 3778;

function checkPortInUse(port) {
    return new Promise((resolve) => {
        const server = net.createServer()
        .once('error', () => {
            server.close();
        })
        .once('listening', () => {
            server.close();
            resolve(false);
        })
        .listen(port, 'localhost');
    })
}

function triggerScript(){
    console.log(`Port ${port} is available. Triggering the script...`);
    exec(`node ${path}`, (error, stdout, stderr) => {
        if(error) {
           console.log('Port in use. Restarting')
            return;
        }

        if(stderr){
            console.log(`Script error. ${stderr}`);
            return;
        }

        console.log(`${stdout}`);
    })
}

function startPort(port) {
    checkPortInUse(port)
            .then((using) => {
                if(using){
                    console.log(`Port ${port} is already in use`);
                } else {
                    triggerScript();
                }
            })
            .catch((err) => {
                console.log(`Error occuring while checking port: ${port}`, err);
            })
}


function checkLoop(port) {
    const checkInterval = 600000;
    startPort(port);
    setInterval(() => {
        console.log('checking port activity...');
        startPort(port);
    }, checkInterval);
}

checkLoop(port);

