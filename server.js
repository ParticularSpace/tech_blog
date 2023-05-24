const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const sequelize = require('./config/connection');
const cookieParser = require('cookie-parser');
const hbs = exphbs.create({});



const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(
    session({
      name: 'my_app.sid', // Set the name of the session cookie
      secret: process.env.SESSION_SECRET, // Set the session secret from environment variable
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Set the session cookie expiration time to 24 hours
      },
    })
  );

  app.use((req, res, next) => {
    // Clear the session cookie if user_sid is present but the user is not logged in
    if (req.cookies.user_sid && !req.session.logged_in) {
      res.clearCookie('my_app.sid');
    }
    next();
  });


app.use(routes);


sequelize.sync({ force: false }).then(() => { // Sync the database models with the database
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });
