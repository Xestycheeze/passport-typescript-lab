import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

namespace Express {
    export interface User {
        id?: number;
    }
}

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

/*
FIXED ME (types) 😭
*/
// according to serializeUser documentation, it accepts the user with type Express.User as arg
// just check index.d.ts in node_modules lol
// we need to do "declaration-merging". research that.
passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void) {
  // the reason why Express.User is so that later on when you call the session object via `req.user`, this variable will be well defined
  done(null, user.id);
});

/*
FIXED ME (types) 😭 (UNSURE, just according to passport\index.d.ts)
*/
passport.deserializeUser(function (id: number, done: (err: any, user?: Express.User | false | null) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
