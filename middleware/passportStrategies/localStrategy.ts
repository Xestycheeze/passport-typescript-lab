import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';


const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
        const user = await getUserByEmailIdAndPassword(email, password);
        return user
            ? done(null, user)
            : done(null, false, {
                message: "Your login details are not valid. Please try again",
            });
    } catch (error: unknown) {
        if (error instanceof Error){
            return done(null, false, {message: error.message});
        } else {
            return done(null, false, {message: "An unknown error occurred."});
        }
    }
  }
);

/*
FIXED ME (types) 😭
*/
// according to serializeUser documentation, it accepts the user with type Express.User as arg
// just check index.d.ts in node_modules lol
// we need to do "declaration-merging". research that.
passport.serializeUser(function (user: Express.User, done: (err: any, id?: number | string) => void) {
  // the reason why Express.User is so that later on when you call the session object via `req.user`, this variable will be well defined
  done(null, user.id);
});

/*
FIXED ME (types) 😭 (UNSURE, just according to passport\index.d.ts)
*/
passport.deserializeUser(async function (id: number | string, done: (err: any, user?: Express.User | false | null) => void) {
  try {
    const user = await getUserById(id);
      if (user) {
          done(null, user);
      } else {
          done({ message: "User not found" }, null);
      }
  } catch(error) {
      done(error, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
