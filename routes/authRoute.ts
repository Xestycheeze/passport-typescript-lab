import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();


router.get("/login", forwardAuthenticated, (req, res) => {
    let loginStatus: string = "";
    if ("messages" in req.session){
        if (req.session.messages instanceof Array){
            loginStatus = req.session.messages[0];
            req.session.messages = [] // reset the message attribute
        }
    }
    res.render("login", {loginStatus});
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIXED ME: 😭 failureMsg needed when login fails */
    failureMessage: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
