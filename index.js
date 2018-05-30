const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const port = argv['p'] || '5555';

// Set certPath to the path to the directory that contains the exported client certificates in PEM format.
var certPath =  path.join('C:', 'qs-proxy-server', 'cert');

var certificates = {
    cert: fs.readFileSync(__dirname +'/cert/client.pem' ),
    key: fs.readFileSync(__dirname +'/cert/client_key.pem'),
    root: fs.readFileSync(__dirname +'/cert/root.pem')
};


// Open a WebSocket using the engine port (rather than going through the proxy)
// We use the certificates and a built-in Qlik service account
// We connect at the global level, which gives access to APIs in the Global class
var strCertificates = {
    cert: certificates.cert.toString('hex'),
    key: certificates.key.toString('hex'),
    root: certificates.root.toString('hex')
};


const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws , req) {
    //console.log(req.headers)
    let wslocal
    try {
        var root = Buffer.from(strCertificates.root, 'hex');

        wslocal = new WebSocket('wss://10.150.0.11:4747/app/', {
            ca: root,
            cert: certificates.cert,
            key: certificates.key,
            headers: {
                'X-Qlik-User':  'UserDirectory=internal; UserId=sa_engine'
            },
            rejectUnauthorized: false
        });

        wslocal.onopen = (event) => {
            // send some message
            console.log('opened')
        }

        wslocal.onerror = (error) => {
            console.log(error)
        }

        wslocal.onmessage = (msg) => {
            ws.send(msg.data);
        }
    } catch(e) {
        console.log('wslocal exception:')
        console.log(e)
    }

    ws.onmessage = (m) => {
        console.log(m)
        wslocal.send(m.data);
    }

    ws.onclose = () => {
        console.log('Close Connection!');
        try {
            if (wslocal !== undefined) {
                if (wslocal.readyState === 1) wslocal.close();
            }
        } catch (e) {
            console.log('ws exception:');
            console.log(e);
        }
    }

});


process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Prevent node exiting...");
});