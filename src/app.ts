import express from 'express';
import {Pool} from "pg";
import usersRoute from './routes/user.route';
import {environment} from "./config/environment";

const app = express();


const pool = new Pool({
    connectionString: environment.dataBaseUrl
});

pool.connect()
    .then(() => console.log('Conexão com o banco de dados efetuada com sucesso!'))
    .catch(err => console.error(`Erro ao efetuar conexão com o banco de dados`, err));


app.use(express.json());

app.use('/users', usersRoute)

export default app;

