const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/users');

module.exports = () => {
  passport.use(
    new kakaoStrategy(
      {
        clientID: process.env.CLIENT_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};