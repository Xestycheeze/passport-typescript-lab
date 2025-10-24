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


// export function getAllSessions(req: Request): {sessionId: string, userId: string}[] {
//     let allSessionsList: {sessionId: string, userId: string}[] = []
//     const store = req.sessionStore;
//     if (store?.all) {
//         store.all((err, sessions) => {
//             if (err) {
//                 throw new Error(err);
//             }
//             if (sessions) {
//                 Object.entries(sessions).forEach(([key, val]: [string, any]) => {
//                     allSessionsList.push({sessionId: key, userId: val.passport?.user})
//                 })
//             }
//         })
//     }
//     return allSessionsList
// }

// I genuinely do not understand why getAllSessions must be async for router.get("/admin",...) to have a pull payload.
// code above should be a synchronous version of getAllSessions, but it doesn't work...
// following code in collaboration with Hitoki
export async function getAllSessions(req: Request): Promise<{ sessionId: string, userId: string | number }[]> {
    return new Promise((res, rej) => {
        const store = req.sessionStore;
        if (store?.all) {
            store.all((err, sessions) => {
                if (err) {
                    return rej(err);
                }
                if (!sessions) {
                    return res([]);
                }
                let allSessions: {sessionId: string, userId: string | number}[] = []
                Object.entries(sessions).forEach(([key, val]: [string, any]) => {
                    allSessions.push({sessionId: key, userId: val.passport?.user})
                })
                res(allSessions)
            })
        }
    })
}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.user?.role !== 'admin'){
        return res.redirect("/dashboard");
    }
    return next()
}