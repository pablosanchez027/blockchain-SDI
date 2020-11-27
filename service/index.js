import express from 'express';
import bodyParser from 'body-parser';
import Blockchain from '../blockchain';
import { restart } from 'nodemon';
import P2PService from './p2p';

const{HTTP_PORT = 3000} = process.env;
const app = express();
const blockchain = new Blockchain();
const p2pservice = new P2PService(blockchain);

app.use(bodyParser.json());

app.get('/blocks',(req,res) =>{
    res.json(blockchain.blocks);
});

// NUEVO
app.post('/mine',(req,res)=>{
    const{body:{ data}} = req;
    const block = blockchain.addBlock(data);

    p2pservice.sync();

    res.json({
        blocks: blockchain.blocks.length, block,
    });
});

app.listen(HTTP_PORT, () => {
    console.log(`Service HTTP: ${HTTP_PORT} funcionando...`);
    p2pservice.listen();

});