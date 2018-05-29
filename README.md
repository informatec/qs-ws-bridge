# qs-proxy-server

Proxy server to bridge the WebSocket connection from client to the Qlik Sense Server.

Only to be used for development Environment!

### installation

```
$ git clone https://github.com/goekaypamuk/qs-proxy-server
```

Create cert folder in the project folder and place following filles:
- client.pem
- client_key.pem
- root.pem

### How to export Certificates from Qlik Sense Server

[Read Qlik Sense Documentation](https://help.qlik.com/en-US/sense/September2017/Subsystems/ManagementConsole/Content/export-certificates.htm)