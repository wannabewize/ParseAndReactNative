const express = require('express');
const {ParseServer} = require('parse-server');
const ParseDashBoard = require('parse-dashboard');

const fs = require('fs');
const configFile = fs.readFileSync('./parseConfig.json', 'utf-8');
const config = JSON.parse(configFile);
console.log('config :', config);

const app = express();

const parserServer = new ParseServer({
    appId: config.appId,
    databaseURI: config.databaseUri,
    masterKey: config.masterKey,
    javascriptKey: config.javascriptKey,
    port: 3000,
});

app.use('/parse', parserServer);

const dashboard = new ParseDashBoard({
    apps: [
        {
            appId: config.appId,
            appName: config.appName,
            masterKey: config.masterKey,      
            serverURL: config.parseServerUrl
        },
    ]}, { allowInsecureHTTP: true});

app.use('/dashboard', dashboard);

module.exports = app;