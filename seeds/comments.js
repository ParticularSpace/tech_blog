const { Comment } = require('../models');

const commentData = [
    {
        content: 'This is the first comment.',
        user_id: 1,
        post_id: 1
    },
    {
        content: 'This is the second comment.',
        user_id: 2,
        post_id: 1
    },
    {
        content: 'This is the third comment.',
        user_id: 3,
        post_id: 4
    },
    {
        content: 'This is the fourth comment.',
        user_id: 4,
        post_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
