import express from 'express';
import router from './router';
import db from './config/db';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log('database connected :)');
    } catch (error) {
        console.log(error);
        console.log('There was an error connecting to the dababase');
    }
}

connectDB();

const server = express();

// routing

server.use('/api/products', router);



export default server;