const Like = require('./Like');
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// User relations
User.hasMany(Post, {
  foreignKey: 'user_id'
});
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
User.belongsToMany(Post, { 
  through: Like, 
  as: 'likedPosts', 
  foreignKey: 'user_id' 
});

// Post relations
Post.belongsTo(User, {
  foreignKey: 'user_id'
});
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
Post.belongsToMany(User, { 
  through: Like, 
  as: 'likers', 
  foreignKey: 'post_id' 
});

// Comment relations
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Like relations
Like.belongsTo(User, {
  foreignKey: 'user_id'
});
Like.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Like };
