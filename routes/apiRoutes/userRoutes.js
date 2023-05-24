const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const bcrypt = require('bcrypt');
require('dotenv').config();



// Register route GOOD
router.post('/signup', async (req, res) => {
    // need to add a check to see if the user already exists
    try {
        // need to bcrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });

        req.session.save(() => {
            req.session.email = userData.email;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });

    }
    catch (err) {
        res.status(500).json(err);
    } 
  });

  module.exports = router;