import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import cors from 'koa-cors';
import convert from 'koa-convert';
import configs from './configs';

import schemas from './schemas/index.js';

const app = new koa();
const router = new koaRouter();

// import mongoose from 'mongoose';
// mongoose.connect(['mongodb://', configs.mongodb.ip, '/', configs.mongodb.dbname].join(''));

router.post('/graphql/users', koaBody(), graphqlKoa({ schema: schemas.UsersSchema }));
router.get('/graphql/users', graphqlKoa({ schema: schemas.UsersSchema }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql/users' }));

app.use(convert(cors(configs.cors)));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(configs.port);