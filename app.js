//______________________________________________________________________________________________________________

// Require Express
const express = require('express');

// Require EJs
const ejs = require('ejs');

// Require Mongoose
const mongoose = require('mongoose');

// Require Lodash
const _ = require('lodash');

// Create Express App
const app = express();

// Create Mongoose Database
mongoose.connect('mongodb+srv://emmanuel-admin:test-123@cluster0.jfq8w.mongodb.net/blogDB');

// Use EJS
app.set('view engine', 'ejs');

// Parse Incoming Requests with Express
app.use(express.urlencoded({
  extended: true
}));

// Serve Static Files with Express
app.use(express.static('public'));

//______________________________________________________________________________________________________________

// Create Posts Schema with Mongoose
const postsSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Create Post Model with Mongoose
const Post = mongoose.model('Post', postsSchema);

//______________________________________________________________________________________________________________

const homeContent = "Write and see your journal entries by clicking 'write something' in the menu or at the footer. Anything you write will be seen by everyone. Likewise, everyone can erase what you write. (Keeping a journal allows you to record what’s happening in your life and to work through your thoughts and feelings. Sometimes, you might write a journal for school to help you deepen your understanding of what you’re studying. Fortunately, writing a journal entry is a simple process. First, choose a topic to write about, like what's happening in your life. Then, write an opening for your entry and express your thoughts. - WikiHow)";

const aboutContent = "About me*. My name is at the footer. This is v2 of of this blog project. I have other projects that work similar to this one (especially the To Do List v2). v2s have databases. v1s store data in arrays. If you are interested in checking them out, click any of the links below.";

const contactContent = "Contact me*. I am not yet open for business as a full stack developer. However, you can follow me on Twitter (@elomondi) to track my progress. I will consider a serious offer once I complete learning everything I need to know. I am currently interested in mentorship, accountability, feedback, peers and career support. If you are willing and able to freely offer those, you could DM me so that we talk about it.";

//______________________________________________________________________________________________________________

// Find posts and display them on the home page with Express, Mongoose and EJS
app.get('/', function(req, res) {
  let homeActivity = "active";
  let writeActivity = "";
  let aboutActivity = "";
  let contactActivity = "";
  // Mongoose
  Post.find({}, function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      const allPosts = posts;
      // EJS
      res.render("home", {
        homeWords: homeContent,
        morePosts: allPosts,
        homeMenuLink: homeActivity,
        writeMenuLink: writeActivity,
        aboutMenuLink: aboutActivity,
        contactMenuLink: contactActivity
      });
    }
  });

});

//______________________________________________________________________________________________________________

// Display about page with Express and EJS
app.get('/about', function(req, res) {
  let homeActivity = "";
  let writeActivity = "";
  let aboutActivity = "active";
  let contactActivity = "";
  // EJS
  res.render("about", {
    aboutWords: aboutContent,
    homeMenuLink: homeActivity,
    writeMenuLink: writeActivity,
    aboutMenuLink: aboutActivity,
    contactMenuLink: contactActivity
  });
});

//______________________________________________________________________________________________________________

// Display contact page with Express and EJS
app.get('/contact', function(req, res) {
  let homeActivity = "";
  let writeActivity = "";
  let aboutActivity = "";
  let contactActivity = "active";
  // EJS
  res.render("contact", {
    contactWords: contactContent,
    homeMenuLink: homeActivity,
    writeMenuLink: writeActivity,
    aboutMenuLink: aboutActivity,
    contactMenuLink: contactActivity
  });
});

//______________________________________________________________________________________________________________

// Display compose page with Express and EJS
app.get('/compose', function(req, res) {
  let homeActivity = "";
  let writeActivity = "active";
  let aboutActivity = "";
  let contactActivity = "";
  // EJS
  res.render("compose", {
    homeMenuLink: homeActivity,
    writeMenuLink: writeActivity,
    aboutMenuLink: aboutActivity,
    contactMenuLink: contactActivity
  });
});

//______________________________________________________________________________________________________________

// Save composed posts with Express, Mongoose and EJS
app.post('/compose', function(req, res) {
  // Mongoose
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err) {
    if (!err) {
      // EJS
      res.redirect('/');
    }
  });
});

//______________________________________________________________________________________________________________

// Display individual composed posts with Express route parameters, Mongoose, EJS and Lodash
app.get('/posts/:post_id', function(req, res) {
  let homeActivity = "";
  let writeActivity = "";
  let aboutActivity = "";
  let contactActivity = "";

  const selectedPost = req.params.post_id;
  // Mongoose
  Post.findOne({_id: selectedPost}, function(err, post) {

    if (err) {
      console.log(err);
    } else {
      // EJS
      res.render("post", {
        requestedTitle: _.startCase(_.toLower(post.title)), // Lodash
        requestedPost: post.content,
        homeMenuLink: homeActivity,
        writeMenuLink: writeActivity,
        aboutMenuLink: aboutActivity,
        contactMenuLink: contactActivity
      });
    }

  });
});

//______________________________________________________________________________________________________________

// Serve app locally and on Heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function() {
  console.log('Server has started successfully.');
});
