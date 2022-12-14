const db = require("../../database/index");
const post = db.post;
const tag = db.tag;
const post_tag = db.post_tag;
const like = db.like;
const user = db.user;
const sequelize = require("sequelize");
const Op = sequelize.Op;

async function createPost(title, content, userId) {
  return post.create({
    title: title,
    content: content,
    user_id: userId,
  });
}

async function createTag(name) {
  return tag.create({
    name: name,
  });
}

async function createPostTag(postId, tagId) {
  return post_tag.create({
    post_id: postId,
    tag_id: tagId,
  });
}

async function readTagByName(name) {
  const data = await tag.findOne({
    where: { name: name },
    raw: true,
  });
  return data;
}

async function readPostById(postId) {
  const data = await post.findOne({
    where: { id: postId },
    raw: true,
  });
  return data;
}

async function updatePost(updateInfo, postId) {
  return post.update(updateInfo, {
    where: {
      id: postId,
    },
  });
}

async function readLikeByPostIdAndUserId(postId, userId) {
  const data = await like.findOne({
    where: {
      post_id: postId,
      user_id: userId,
    },
    raw: true,
  });
  return data;
}

async function createLike(postId, userId) {
  return like.create({
    post_id: postId,
    user_id: userId,
  });
}

async function deleteLike(postId, userId) {
  return like.destroy({
    where: {
      post_id: postId,
      user_id: userId,
    },
  });
}

async function readPostList(condition) {
  const offset = (condition.page - 1) * condition.limit;
  const data = await post.findAll({
    attributes: [
      ["id", "게시글_id"],
      ["title", "제목"],
      ["hit", "조회수"],
      ["createdAt", "작성일"],
      [sequelize.col("user.name"), "작성자"],
      [sequelize.fn("count", sequelize.col("like.id")), "좋아요 수"],
    ],
    include: [
      {
        model: user,
        as: "user",
        attributes: [],
      },
      {
        model: like,
        as: "like",
        attributes: [],
      },
    ],
    group: "post.id",
    where: {
      title: {
        [Op.like]: "%" + condition.search + "%",
      },
    },
    order: [[condition.orderBy, condition.order]],
    offset: offset,
    limit: Number(condition.limit),
    subQuery: false,
    raw: true,
  });
  return data;
}

module.exports = {
  createPost,
  createTag,
  createPostTag,
  readTagByName,
  readPostById,
  updatePost,
  readLikeByPostIdAndUserId,
  createLike,
  deleteLike,
  readPostList,
};
