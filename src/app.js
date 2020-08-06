import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './database/DB.js';
import routes from './routes/routes.js';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const { connection } = mongoose;

db;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/build')));
app.use('/v1/api/agenda', routes);

connection.once('open', () => {
  try {
    console.log('Conectado ao MongoDB');
    const APP_PORT = process.env.PORT || 3001;
    app.listen(APP_PORT, () => {
      console.log(`Servidor iniciado na porta ${APP_PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
});

app.get('/v1/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});
