const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  //res.send('It works!');
  res.render('layout', { title: 'Home Page' });
});

router.get('/register', (req, res) => {
  //res.send('It works!');
  res.render('form', { title: 'Registration form' });
});

router.get('/registrants', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('registrants', { title: 'Listing registrations', registrations });
    })
    .catch(() => { 
      res.send('Sorry! Something went wrong.'); 
    });
}));

router.post('/', 
    [
        check('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
        check('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
    ],
  (req, res) => {
        //console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          const registration = new Registration(req.body);
          registration.save()
            .then(() => {res.render('thankyou', { title: 'Thank you for Registration' });})
            .catch((err) => {
              console.log(err);
              res.send('Sorry! Something went wrong.');
            });
          } else {
            res.render('form', { 
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
             });
          }
    });
  
  app.get("/manifest.json", function(req, res){
    res.header("Content-Type", "text/cache-manifest");
    res.sendFile(path.join(__dirname, "manifest.json"));
  });

  app.get("/sw.js", function(req, res){
    res.header("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "sw.js"));
  });

  app.get("/loader.js", function(req, res){
    res.header("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "loader.js"));
  });

module.exports = router;