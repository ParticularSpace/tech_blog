const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, Like } = require('../../models');
const bcrypt = require('bcrypt');
require('dotenv').config();
const withAuth = require('../../utils/auth');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Validate the user input
        if (!req.body.email || !req.body.password || !req.body.username || !req.body.date_of_birth || !req.body.phone_number) {
            return res.status(400).json({ message: 'All fields are required except for profile picture' });
        }
        if (req.body.password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user
        const userData = await User.create({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            date_of_birth: req.body.date_of_birth,
            phone_number: req.body.phone_number,
            profile_picture: req.body.profile_picture || null // Use the provided profile picture or default to null
        });

        // Create a session
        req.session.save(() => {
            req.session.email = userData.email;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });

    } catch (err) {
        console.error(err.message);
        console.error(err.stack);
        res.status(500).json(err);
    }

});


// Login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(404).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.email = userData.email;
            req.session.logged_in = true;
            req.session.user_id = userData.id;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

        console.log(req.session, 'req.session')

    } catch (err) {
        res.status(500).json(err);
    }
});

// Logout route
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to post a new post
router.post('/post', withAuth, async (req, res) => {
    console.log(req.body, 'req.body in /post');
    try {
        // Assuming user_id is stored in req.session.user_id when the user logs in
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            // image: req.body.image || null,
            user_id: req.session.user_id  // Associate the post with the logged in user
        });

        console.log(postData, 'postData');

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/posts/:id/like', async (req, res) => {
    console.log('route hit');
    console.log(req.body, 'req.body');
    try {
      const postId = req.params.id;
      const userId = req.session.user_id;  // or however you track logged in users

      console.log(postId, 'postId');
        console.log(req.session.user_id, 'req.session RIGHT HERE YOOOOOOO');

      const post = await Post.findByPk(postId, {
        include: { model: User, as: 'likers' }
    });
    const user = await User.findByPk(userId, {
        include: { model: Post, as: 'likedPosts' }
    });
    
    console.log(post, 'post HERE !!!!!');
    console.log(user, 'user HERE !!!!!');

      if (!post || !user) {
        // either post or user does not exist
        return res.status(404).json({ message: 'Post or user not found' });
      }

      if (req.body.like) {
        // User wants to like the post
        await post.addLikers(user);
    } else {
        // User wants to unlike the post
        await post.removeLikers(user);
    }
    

      const updatedLikesCount = await post.countLikers();

      console.log(updatedLikesCount, 'updatedLikesCount');

      res.json({ success: true, likesCount: updatedLikesCount });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
});

// Route to comment on a post
router.post('/posts/:id/comment', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.params.id
        });

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;
