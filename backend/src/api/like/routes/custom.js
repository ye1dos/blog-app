module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts/user/likes",
      handler: "like.findLikeByIds",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/posts/like",
      handler: "like.likePost",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/posts/dislike",
      handler: "like.dislikePost",
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
