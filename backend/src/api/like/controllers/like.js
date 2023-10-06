"use strict";

/**
 * like controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::like.like", ({ strapi }) => ({
  async findLikeByIds(ctx) {
    const { userId, postId } = ctx.query;
    const likes = await strapi.service("api::like.like").find({
      userId: userId,
      postId: postId,
    });
    return this.transformResponse(likes);
  },
  async likePost(ctx) {
    const { userId, postId } = ctx.request.body;
    const post = await strapi.service("api::post.post").findOne(postId + "");
    await strapi.service("api::post.post").update(postId + "", {
      data: {
        likesNumber: post.likesNumber + 1,
      },
    });
    const likes = await strapi.service("api::like.like").create({
      data: {
        userId: userId + "",
        postId: postId + "",
        publishedAt: new Date(),
      },
    });

    return this.transformResponse(likes);
  },
  async dislikePost(ctx) {
    const { userId, postId } = ctx.request.body;
    const post = await strapi.service("api::post.post").findOne(postId + "");
    await strapi.service("api::post.post").update(postId + "", {
      data: {
        likesNumber: post.likesNumber - 1,
      },
    });
    const like = await strapi.service("api::like.like").find({
      where: {
        userId: userId + "",
        postId: postId + "",
      },
    });
    console.log(like);
    like.results.length &&
      (await strapi.service("api::like.like").delete(like.results[0].id));
    return { message: "deleted" };
  },
}));
