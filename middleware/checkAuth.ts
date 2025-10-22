import {Request, Response, NextFunction} from "express";
// datatypes discovered in express-serve-static-core\index.d.ts
// UNSURE since Request has been augmented by Passport, but not Response nor NextFunction. Maybe this will cause problems down the line
/*
FIXED ME (types) 😭
*/
export const ensureAuthenticated = (req: Request, res: Response , next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIXED ME (types) 😭
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}