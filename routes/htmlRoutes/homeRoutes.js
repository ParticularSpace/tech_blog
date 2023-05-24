const exppress = require('express');
const router = exppress.Router();
// const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../../models');

router.get('/', (req, res) => {
    console.log('hit dashboard route');
    try{
        res.render('dashboard')
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;