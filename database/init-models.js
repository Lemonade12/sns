var DataTypes = require("sequelize").DataTypes;
var userModel = require("../src/user/model/user");
var postModel = require("../src/post/model/post");
var tagModel = require("../src/post/model/tag");
var postTagModel = require("../src/post/model/post_tag");
var likeModel = require("../src/post/model/like");

function initModels(sequelize) {
  var user = userModel(sequelize, DataTypes);
  var post = postModel(sequelize, DataTypes);
  var tag = tagModel(sequelize, DataTypes);
  var post_tag = postTagModel(sequelize, DataTypes);
  var like = likeModel(sequelize, DataTypes);

  like.belongsTo(user, { foreignKey: "user_id", as: "user" });
  user.hasMany(like, { foreignKey: "user_id", as: "like" });
  post.belongsTo(user, { foreignKey: "user_id", as: "user" });
  user.hasMany(post, { foreignKey: "user_id", as: "post" });
  post_tag.belongsTo(post, { foreignKey: "post_id", as: "post" });
  post.hasMany(post_tag, { foreignKey: "post_id", as: "post_tag" });
  post_tag.belongsTo(tag, { foreignKey: "tag_id", as: "tag" });
  tag.hasMany(post_tag, { foreignKey: "tag_id", as: "post_tag" });
  like.belongsTo(post, { foreignKey: "post_id", as: "post" });
  post.hasMany(like, { foreignKey: "post_id", as: "like" });

  return {
    user,
    post,
    tag,
    post_tag,
    like,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
