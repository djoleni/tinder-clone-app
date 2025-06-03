import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import path from 'path';

import {createServer} from 'http';

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import matchRoutes from './routes/matchRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

import { connectDB } from './config/db.js'
import { initializeSocket } from './socket/socket.server.js';



dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


initializeSocket(httpServer);

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/messages', messageRoutes)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/dist')))

    app.get('*name', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));  //for any route other than those above, send the react app 
    })
}




httpServer.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    connectDB();
})