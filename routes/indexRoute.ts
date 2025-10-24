import express from "express";
const router = express.Router();
import { ensureAuthenticated, checkAdmin, getAllSessions } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

// router.get("/admin", checkAdmin, (req, res) => {
//     const sessions = getAllSessions(req);
//     res.render("admin", { sessions });
// })

// for some reasons this has to be async to have a pull payload.
// code above should be a synchronous version of getAllSessions, but it doesn't work...
// following code in collaboration with Hitoki
router.get("/admin", checkAdmin, async (req, res) => {
    const sessions = await getAllSessions(req);
    res.render("admin", { sessions });
})

router.post("/admin/revoke/:sessionId", checkAdmin, (req, res) => {
    const sessionId = req.params.sessionId;
    req.sessionStore.destroy(sessionId, (err) => {
        if(err){
            throw new Error(err)
        }
        res.redirect("/admin")
    })
})
export default router;
