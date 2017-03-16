/*jshint esversion: 6 */

import React from 'react';
import express from 'express';
import http from 'http';
import { renderToString } from 'react-dom/server';
import path from 'path';


let app = express();
var server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res, err) => {
    res.sendFile(path.join( __dirname, '../public/index.html'));;
});


server.listen(process.env.PORT || 8081);

const io = require('socket.io').listen(server);

let connected_users = {};

io.on('connection', (client) => {
    let username = "user" + Math.floor(Math.random() * 100);
    connected_users[client.id] = username;
    client.emit('message', { type: "system_message", user: "", text: "Your username is " + connected_users[client.id] + "." });
    io.emit('message', { type: "system_message", user: "", text: connected_users[client.id] + " joined." });

    client.on('message', (data) => {
        io.emit('message', { type: "user_message", user: connected_users[client.id], text: data.text })
    });

    client.on('disconnect', () => {
        io.emit('message', { type: "system_message", user: "", text: connected_users[client.id] + " left." });
    });
});
