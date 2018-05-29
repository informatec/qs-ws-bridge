# qs-proxy-server

Proxy server to bridge the WebSocket connection from client to the Qlik Sense Server.

Only to be used for development Environment!

## installation

```
$ git clone https://github.com/informatec/qs-ws-bridge
```

Create cert folder in the project folder and place following filles:
- client.pem
- client_key.pem
- root.pem

## Usage

Run the index file to lunch the WebSocket Bridge server.
```
$ node index
```

The server will listen per dafault to port 5555. You can provide a parameter with _-p_ to override the port configuration.

```
$ node index -p 8090
```


#### How to export Certificates from Qlik Sense Server

[Read Qlik Sense Documentation](https://help.qlik.com/en-US/sense/September2017/Subsystems/ManagementConsole/Content/export-certificates.htm)

## License

MIT License

[Copyright (c) 2018 Informatec Ltd.liab.Co.](https://github.com/informatec/qs-ws-bridge/blob/master/LICENSE)