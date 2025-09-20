import passport from "passport";
import { env } from "../../env";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../../db";

function initPassport() {
  passport.initialize();

  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          callbackURL: env.GOOGLE_REDIRECT_URI,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            if (!profile) {
              return done(null);
            }

            const name = profile.displayName;
            const email = profile.emails?.[0]?.value;
            const avatar = profile.photos?.[0]?.value;

            if (!email) {
              return done(null);
            }

            let user = await db.user.findUnique({
              where: {
                email: email,
              },
            });

            if (!user) {
              user = await db.user.create({
                data: {
                  email: email,
                  name,
                  avatar,
                  username:
                    email.split("@")[0] +
                    "-" +
                    Math.floor(Math.random() * 1000),
                  authProvider: "GOOGLE",
                },
              });
            }

            if (!user) {
              return done(null);
            }

            return done(null, {
              id: user?.id,
              name,
              avatar,
              email,
            });
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }
}

export { initPassport };
