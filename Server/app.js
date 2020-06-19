const express = require('express');
const {ParseServer} = require('parse-server');
const ParseDashBoard = require('parse-dashboard');

const app = express();


const AppId = 'parse-rn-example';
const MasterKey = 'parse-rn-masterKey';
const JavascriptKey = 'parse-rn-jsKey';
const DatabaseUri = 'mongodb://127.0.0.1/parse-rn'

const parserServer = new ParseServer({
    databaseURI: DatabaseUri,
    appId: AppId,
    masterKey: MasterKey,
    javascriptKey: JavascriptKey,
    port: 3000,
});

app.use('/parse', parserServer);

const dashboard = new ParseDashBoard({apps: [
    {
        serverURL: 'http://localhost:3000/parse',
        appId: AppId,
        masterKey: MasterKey,
        appName: 'Parse-ReactNative-Example'

    }
]});

app.use('/dashboard', dashboard);

module.exports = app;