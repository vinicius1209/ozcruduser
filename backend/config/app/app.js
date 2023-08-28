/* eslint-disable no-console */
import Koa from 'koa';
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import usersRoutes from '../../api/users/index.js';

dotenv.config();

const app = new Koa();
app.use(bodyParser());

// Habilita CORS para todos os domínios
app.use(cors())

// Rotas de usuários
app.use(usersRoutes.routes());
app.use(usersRoutes.allowedMethods());


export default app;