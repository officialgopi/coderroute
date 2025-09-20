import passport from "passport";
import { env } from "../../env";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      avatar?: string;
      username: string;
      isEmailVerified: boolean;
      role: "USER" | "ADMIN";
      authProvider: "GOOGLE" | "GITHUB";
    }

    interface Request {
      user?: User;

      // Add this for passport compatibility
      User?: {
        name?: string;
        avatar?: string;
        email: string;
        username: string;
      };
    }
  }
}

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
        (_accessToken, _refreshToken, profile, done) => {
          try {
            if (!profile) {
              return done(null);
            }

            const name = profile.displayName;
            const email = profile.emails?.[0]?.value;
            const avatar = profile.photos?.[0]?.value;

            if (!email) {
              return done(null, false, { message: "No email found" });
            }

            return done(null, {
              name,
              avatar,
              email,
              username: email.split("@")[0] + Math.floor(Math.random() * 10000),
              id: email, // temporary ID until user is created
              isEmailVerified: true,
              role: "USER",
              authProvider: "GOOGLE",
            });
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }
}

export { initPassport };
