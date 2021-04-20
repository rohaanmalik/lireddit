import { isAuth } from "../middlerware/isAuth";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post]) // convert class posts into graphql types
  posts(
    @Arg("limit") limit: number,
    @Arg("offset", () => String, { nullable: true }) cursor: string | null
  ): Promise<Post[]> {

    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit)
    if (cursor){
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }
    return qb.getMany();
  }

  @Query(() => Post, { nullable: true }) // Post | null for graphql type
  postsById(
    @Arg("id", () => Int) id: number // again two declaration  here bc graphql otherwise it's usually one
  ): Promise<Post | undefined> {
    // duplication of promise type bc type-graphql (ts type)
    // return an array of post
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput, // again two declaration  here bc graphql otherwise it's usually one
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    // duplication of promise type bc type-graphql (ts type)
    // return an array of post
    console.log(req.session.userID);
    return Post.create({
      ...input,
      creatorId: req.session.userID,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number, // again two declaration  here bc graphql otherwise it"s usually one
    @Arg("title", () => String, { nullable: true }) title: string
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
    @Arg("id", () => Int) id: number // again two declaration  here bc graphql otherwise it"s usually one
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