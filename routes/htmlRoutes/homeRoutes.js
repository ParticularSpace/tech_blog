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

        // Fetch user first
        const user = await User.findOne({
            where: { id: req.session.user_id },
            include: { model: Post, as: 'likedPosts' }
        });

        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }

        const postsData = await Post.findAll({
            include: [ { model: User, attributes: ['username'] } ],
            order: [['createdAt', 'DESC']]
        });
        
        
        const likesData = await Like.findAll({
            attributes: [
                'post_id',
                [sequelize.fn('count', sequelize.col('id')), 'likes_count']
            ],
            group: ['post_id']
        });
        
        let likesCountMap = {};
        likesData.forEach((like) => {
          likesCountMap[like.dataValues.post_id] = like.dataValues.likes_count;
        });
        
        // Combine posts and likes
        const posts = postsData.map((post) => {
            const postPlain = post.get({ plain: true });
            postPlain.likes_count = likesCountMap[post.id] || 0;

            // Check if user has liked this post
            postPlain.isLikedByCurrentUser = user.likedPosts.some(likedPost => likedPost.id === post.id);

            return postPlain;
        });

        
        res.render('dashboard', { 
            posts, 
            logged_in: req.session.logged_in,
            profile_picture: req.session.profile_picture
        });
        

    } catch (err) {
        console.error(err);
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
    
        const userData = await User.findOne({
            where: {
                email: req.session.email
            },
            attributes: { exclude: ['password'] }  
        });
        
        console.log(userData, 'userData')

        if (!userData) {
          
            res.status(404).json({ message: 'No user found with this email!' });
            return;
        }

     
        const user = userData.get({ plain: true });


        
        res.render('account', {
             user,
            logged_in: req.session.logged_in,
            profile_picture: req.session.profile_picture,
             });

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