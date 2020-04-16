const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/user/signup', function(req,res,next){
  var user = new User ({email: req.body.email,password: bcrypt.hashSync(req.body.password,10),firstName: req.body.firstName,lastName: req.body.lastName});
  user.save(function(err, result){
    if (err){
      return res.status(500).json({
        title:'an error occured',
        error: err
      });
    }
    res.status(201).json({
        message:'User Created',
        obj: result
      });
  });
});

router.post('/user/signin', function(req,res,next){
  User.findOne({email: req.body.email}, function( err, user){
    if (err) {
      return res.status(500).json({
        title:'an error occured',
        error: err
      });
    }
    if(!user){
      return res.status(401).json({
        title:'Invalid input',
        error: {message: 'Invalid input'}
      });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title:'Invalid input',
        error: {message: 'Invalid input'}
      });
    }
    var token = jwt.sign({user: user}, 'testSecureString', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    });
  });
});

router.use('/',function(req,res,next){
    jwt.verify(req.query.token, 'testSecureString', function(err, decoded){
      if (err) {
        return res.status(500).json({
          title:'An error occured',
          error: err
        });
      }
      if(decoded.user._id == '')
      {
        return res.status(500).json({
          title:'An error occured',
          error: 'Token Needed'
        });
      }
      next();
    })
});

router.delete('/user/deleteUser/:userID', function(req,res,next){
  User.findOneAndDelete({_id: req.params.userID}).then(function(user){
    res.send(user);
  }).catch(next)
});

module.exports = router;