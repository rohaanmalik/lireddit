import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {

    @Query(() => [Post]) // convert class posts into graphql types
    posts (
        @Ctx() { em }: MyContext
        ): Promise<Post[]> { // duplication bc type-graph
        // return an array of post
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true }) // Post | null for graphql type
    postsById (
        @Arg('id', () => Int) id: number, // again two declaration  here bc graphql otherwise it's usually one 
        @Ctx() { em }: MyContext ): Promise<Post | null > { // duplication of promise type bc type-graphql (ts type)
           // return an array of post
        return em.findOne(Post, {id});

    }

    @Mutation(() => Post)
    async createPost (
        @Arg('title', () => String) title: string, // again two declaration  here bc graphql otherwise it's usually one 
        @Ctx() { em }: MyContext ): Promise<Post> { // duplication of promise type bc type-graphql (ts type)
           // return an array of post
        const post = em.create(Post, { title });
        await em.persistAndFlush(post);
        return post;
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost (
        @Arg("id", () => Int) id: number, // again two declaration  here bc graphql otherwise it"s usually one 
        @Arg("title", () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext ): Promise<Post | null > { // duplication of promise type bc type-graphql (ts type)
           // return an array of post
        const post = await em.findOne(Post, { id });
        if (!post) {
            return null;
        }
        if (typeof title !== "undefined") {
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;
    }

    @Mutation(() => Boolean)
    async deletePost (
        @Arg("id", () => Int) id: number, // again two declaration  here bc graphql otherwise it"s usually one 
        @Ctx() { em }: MyContext): Promise<Boolean> { // duplication of promise type bc type-graphql (ts type)
        try {
            await em.nativeDelete(Post, { id });
            return true;
        } catch (error) {
            return false;
        }
    }
}