const db = require("../../database/index");
const post = db.post;
const tag = db.tag;
const post_tag = db.post_tag;
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

async function createPostTag(post_id, tag_id) {
  return post_tag.create({
    post_id: post_id,
    tag_id: tag_id,
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

module.exports = {
  createPost,
  createTag,
  createPostTag,
  readTagByName,
  readPostById,
  updatePost,
};
