const { User } = require('../models');

const userData = [
    {
        username: 'user1',
        email: 'user1@example.com',
        date_of_birth: '1990-01-01',
        phone_number: '1234567890',
        password: 'password1',
        profile_picture: null
    },
    {
        username: 'user2',
        email: 'user2@example.com',
        date_of_birth: '1990-01-01',
        phone_number: '1234567890',
        password: 'password2',
        profile_picture: null
    },
    {
        username: 'user3',
        email: 'user3@example.com',
        date_of_birth: '1990-01-01',
        phone_number: '1234567890',
        password: 'password3',
        profile_picture: null
    },
    {
        username: 'user4',
        email: 'user4@example.com',
        date_of_birth: '1990-01-01',
        phone_number: '1234567890',
        password: 'password4',
        profile_picture: null
    },
    {
        username: 'user5',
        email: 'user5@example.com',
        date_of_birth: '1990-01-01',
        phone_number: '1234567890',
        password: 'password5',
        profile_picture: null
    }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
