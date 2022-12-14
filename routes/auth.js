const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/err');
const User = require('../models/users');
const { where } = require('sequelize');

const router = express.Router();

router.post('./join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); //미들웨어 내의 미들웨어는 (req,res,next)를 붙여야한다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(err => {
    req.session.destroy();
    if (!err) {
      res.redirect('/');
    }//전부 동일한 작동
    // if (err) {
    //   res.redirect('/');
    // } else {
    //   //err false일때
    //   res.redirect('/');
    // } //npm i passport@0.6 버전
  });
  // req.session.destroy();
  // res.redirect('/');----------------> npm i passport@0.5 버전
});

router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '' }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
