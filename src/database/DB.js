import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DB } = process.env;

const db = mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

export default db;
