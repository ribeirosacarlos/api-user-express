import app from './app';
import dotenv from 'dotenv';

dotenv.config();

app.listen(3000, () => console.log('API rodando na porta 3000'));