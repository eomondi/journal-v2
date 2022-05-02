const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Write and see your journal entries by clicking 'write something' in the menu or at the footer. Anything you write will be seen by everyone. Likewise, everyone can erase what you write. If you wish to erase your journal entries, scroll to the footer of any page and click the 'Erase Journal' button. (Keeping a journal allows you to record what’s happening in your life and to work through your thoughts and feelings. Sometimes, you might write a journal for school to help you deepen your understanding of what you’re studying. Fortunately, writing a journal entry is a simple process. First, choose a topic to write about, like what's happening in your life. Then, write an opening for your entry and express your thoughts. - WikiHow)";

const aboutContent = "About me*. My name is at the footer. I have other projects that work similar to this one (especially the To Do List). If you are interested in checking them out, click either of the buttons below.";

const contactContent = "Contact me*. I am not yet open for business as a full stack developer. However, you can follow me on Twitter (@elomondi) to track my progress. I will consider a serious offer once I complete learning everything I need to know. I am currently interested in mentorship, accountability, feedback, peers and career support. If you are willing and able to freely offer those, you could DM me so that we talk about it.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get('/', function(req, res) {

  res.render("home", {
    homeWords: homeStartingContent,
    morePosts: posts
  });

});

app.get('/about', function(req, res) {

  res.render("about", {
    aboutWords: aboutContent
  });

});

app.get('/contact', function(req, res) {

  res.render("contact", {
    contactWords: contactContent
  });

});

app.get('/compose', function(req, res) {

  res.render("compose");

});

app.post('/compose', function(req, res) {

  const blogPost = {
    blogTitle: req.body.postTitle,
    blogBody: req.body.postBody
  };

  posts.push(blogPost);

  res.redirect('/');

});

app.get('/posts/:postName', function(req, res) {
  for (var i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].blogTitle) === _.lowerCase(req.params.postName)) {
      res.render("post", {
        requestedTitle: _.startCase(_.toLower(posts[i].blogTitle)),
        requestedPost: posts[i].blogBody
      });
    }
  }
});

app.get('/erase', function(req, res) {
  posts = [];
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {

  console.log("Server started on port 3000.");

});
