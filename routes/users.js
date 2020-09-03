const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var ejs = require('ejs')

// Load User model

const User = require('../models/User');
const data = require('../models/data')
//const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => 
{                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });


      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


router.get('/viewall',ensureAuthenticated,(req,res)=>{
   //console.log("login respose")
   //console.log(res)
   var email = res.locals.currentUser.email ;
   var query = {email:email}
   //console.log(email)
 data.find({ email: email }).then(docs => {

    if (docs != null){

     console.log(docs)
     //docs.forEach(function(docs, index) {
     //console.log(index + " key: " + docs.email)
       //});
     res.render('viewall', { data: docs });
    }
   else{
    res.render('viewall', { data: docs() });
   }
  });

});


router.get('/codechef',ensureAuthenticated,(req,res)=>{
   var email = res.locals.currentUser.email ;
 data.find({ email: email }).then(docs => {
  
      if (docs != null ){   
        res.render('codechefviewall', { data: docs });

     
    }
   else{
    res.render('codechefviewall', { data: docs() });
   }
  });

});
router.get('/geeksforgeeks',ensureAuthenticated,(req,res)=>{
   var email = res.locals.currentUser.email ;
 data.find({ email: email }).then(docs => {
  
      if (docs != null ){   
        res.render('g4gviewall', { data: docs });

     
    }
   else{
    res.render('g4gviewall', { data: docs() });
   }
  });

});
router.get('/leetcode',ensureAuthenticated,(req,res)=>{
   var email = res.locals.currentUser.email ;
 data.find({ email: email }).then(docs => {
  
      if (docs != null ){   
        res.render('leetcodeviewall', { data: docs });

     
    }
   else{
    res.render('leetcodeviewall', { data: docs() });
   }
  });

});
router.get('/hackerrank',ensureAuthenticated,(req,res)=>{
   var email = res.locals.currentUser.email ;
 data.find({ email: email }).then(docs => {
  
      if (docs != null ){   
        res.render('hackerrankviewall', { data: docs });

     
    }
   else{
    res.render('hackerrankviewall', { data: docs() });
   }
  });

});
router.get('/hackerearth',ensureAuthenticated,(req,res)=>{
   var email = res.locals.currentUser.email ;
 data.find({ email: email }).then(docs => {
  
      if (docs != null ){   
        res.render('hackerrankviewall', { data: docs });

     
    }
   else{
    res.render('hackerrankviewall', { data: docs() });
   }
  });

});
router.get('/topcoder',ensureAuthenticated,(req,res)=>{
   var email = res.locals.currentUser.email ;
 data.find({ email: email }).then(docs => {
  
      if (docs != null ){   
        res.render('topcoderviewall', { data: docs });

     
    }
   else{
    res.render('topcoderviewall', { data: docs() });
   }
  });

});

/*

   data.find((err, docs) => {
    if (err) { return next(err); }
    if (docs != null){
     //console.log(docs.length)
     //docs.forEach(function(docs, index) {
     //console.log(index + " key: " + docs.email)
       //});
     res.render('viewall', { data: docs });
    }
   else{
    res.render('viewall', { data: docs() });
   }
 });
  
*/


router.get('/add',ensureAuthenticated,(req,res,email)=>{
  //console.log (req)

  //const abc = JSON.parse(JSON.stringify()); // req.body = [Object: null prototype] { title: 'product' }

 //console.log(res.locals.currentUser.email)

  res.render('add')
})

router.post('/add',ensureAuthenticated,(req,res)=>{
 // console.log(res.email)

  var question = req.body.question
  var url = req.body.url
  var category = req.body.category
  var site = req.body.site
  var done = req.body.done
  var date = req.body.date
var email = res.locals.currentUser.email 

  const newUser = new data({
          email,
          question,
          url,
          category,
          site,
          done,
          date
        });

      newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'question added'
                );
                res.redirect('/users/add');
              })
              .catch(err => console.log(err));

 
  
})

router.get('/myprofile',ensureAuthenticated,(req,res)=>{
  res.render(myprofile)
})

module.exports = router;
