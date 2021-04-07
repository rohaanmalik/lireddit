import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from './types';

const main =  async () => {
  const orm = await MikroORM.init(microConfig); // connect to the db
  await orm.getMigrator().up(); // creating a table

  // express app
  const app = express();

  // redis setup before the apollo bc this will run inside apollo 
  let RedisStore = connectRedis(session);
  let redisClient = redis.createClient();

  app.use(
    session({
      name: "qid", //cookie name
      store: new RedisStore({
        client: redisClient,
        disableTouch: true, // make call (touchs) when a user does something to make teh cookie active
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 yrs
        sameSite: "lax", // ?? GOOGLE
        httpOnly: true, // cannot access the cookie in teh frontend
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "abcd", // we would want to have it as an env var (dont know why thou?)
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false, // class validation is false
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server is running at 4000");
  });
}

main().catch((err) => {
    console.error(err);
});