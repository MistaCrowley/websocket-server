
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const server = express().listen(3000);

const wss = new SocketServer({ server });


wss.on('connection', (ws) => {

        console.log('[Server] A client was connected');

        ws.on('close', () => {
                console.log('[Server] Client disconnecetd')
                });

        ws.on('message', (message) => {
                console.log('[Server] Received message: %s', message);

                //broadcast to every client that it's connected
                wss.clients.forEach(function each(client) {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                                client.send(message);
                        }
                });

        });
});
