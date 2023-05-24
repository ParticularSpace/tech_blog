const exppress = require('express');
const router = exppress.Router();
// const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../../models');

router.get('/', (req, res) => {
    try{
        res.render('dashboard')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {   
    try{
        res.render('login')
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;