import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post]) // convert class posts into graphql types
  posts(): Promise<Post[]> {
    // duplication bc type-graph
    // return an array of post
    return Post.find();
  }

  @Query(() => Post, { nullable: true }) // Post | null for graphql type
  postsById(
    @Arg("id", () => Int) id: number, // again two declaration  here bc graphql otherwise it's usually one
  ): Promise<Post | undefined> {
    // duplication of promise type bc type-graphql (ts type)
    // return an array of post
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string, // again two declaration  here bc graphql otherwise it's usually one
  ): Promise<Post> {
    // duplication of promise type bc type-graphql (ts type)
    // return an array of post
    return Post.create({ title }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number, // again two declaration  here bc graphql otherwise it"s usually one
    @Arg("title", () => String, { nullable: true }) title: string,
  ): Promise<Post | null> {
    // duplication of promise type bc type-graphql (ts type)
    // return an array of post
    const post = await Post.findOne(id);
    // const post = await Post.findOne({ where: id});
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number, // again two declaration  here bc graphql otherwise it"s usually one
  ): Promise<Boolean> {
    // duplication of promise type bc type-graphql (ts type)
    try {
      await Post.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}