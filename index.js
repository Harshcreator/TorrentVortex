'use strict';

import fs from 'fs';
import bencode from 'bencode';
import dgram from 'dgram';
import urlParse from 'url-parse';
import { Buffer } from 'buffer'; 

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));
const url = urlParse(torrent.announce.toString('utf8'));
const port = (url.port >  0 && url.port < 65535) ? url.port : 6881; // Ensure port is within valid range
const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?', 'utf8');

socket.send(myMsg, 0, myMsg.length, url.port, url.hostname, () => {}); // Use url.hostname instead of url.host
socket.on('message', msg => {
    console.log('message is: ', msg.toString()); // Ensure message is converted to string for readability
});