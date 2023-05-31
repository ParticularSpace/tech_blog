const exppress = require('express');
const router = exppress.Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');


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

        // Fetch all posts and associated data
        const postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        console.log(postsData, 'postsData');

        // Serialize data so the template can read it
        const posts = postsData.map((post) => post.get({ plain: true }));

        console.log(posts, 'posts');

        // Pass serialized data and session flag into template
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