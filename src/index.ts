import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./entities/constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main =  async () => {
    const orm = await MikroORM.init(microConfig); // connect to the db
    await orm.getMigrator().up(); // creating a db
    // const post = orm.em.create(Post, { title: 'testing title' }) // creates a class
    // await orm.em.persistAndFlush(post); 

    const posts = await orm.em.find(Post, {});
    console.log(posts);
 }

main().catch((err) => {
    console.error(err);
});