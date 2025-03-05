import express from 'express';
import router from './router';
import db from './config/db';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
    } catch (error) {
        console.log(error);
        console.log('There was an error connecting to the dababase');
    }
}

connectDB();

const server = express();

// reading json responses
server.use(express.json());

// routing

server.use('/api/products', router);

server.get('/api', (req, res) => {
    res.json({
        msg: 'From API'
    })
})



export default server;