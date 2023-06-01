const exppress = require('express');
const router = exppress.Router();
const { User, Post, Like } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


router.get('/', (req, res) => {
    try{
        res.render('dashboard')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    console.log(req.session, 'req.session in /dashboard')
    try {
        // Ensure the user is logged in
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const postsData = await Post.findAll({
            include: [ { model: User, attributes: ['username'] } ]
        });
        
        const likesData = await Like.findAll({
            attributes: [
                'post_id',
                [sequelize.fn('count', sequelize.col('id')), 'likes_count']
            ],
            group: ['post_id']
        });

        console.log(likesData, 'likesData')
        
        let likesCountMap = {};
        likesData.forEach((like) => {
          likesCountMap[like.dataValues.post_id] = like.dataValues.likes_count;
        });
        

        console.log(likesCountMap, 'likesCountMap')
        
        // Combine posts and likes
        const posts = postsData.map((post) => {
            const postPlain = post.get({ plain: true });
            postPlain.likes_count = likesCountMap[post.id] || 0;
            return postPlain;
        });

        console.log(posts, 'posts')
        
        res.render('dashboard', { 
            posts, 
            logged_in: req.session.logged_in 
        });
        

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

router.get('/signup', (req, res) => {
    try{
        res.render('signup')
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/account', withAuth, async (req, res) => {
    try {
        // fetch the user data from the database
        const userData = await User.findOne({
            where: {
                email: req.session.email
            },
            attributes: { exclude: ['password'] }  // exclude the password from the returned data
        });
        

        console.log(userData, 'userData')

        if (!userData) {
            // if no user is found, return an error
            res.status(404).json({ message: 'No user found with this email!' });
            return;
        }

        // serialize the data before passing to template
        const user = userData.get({ plain: true });

        // pass the data to the template
        res.render('account', { user });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post', withAuth, async (req, res) => {
    try {
        res.render('post')
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;