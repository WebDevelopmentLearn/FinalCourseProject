import {NextFunction, Router, Request, Response} from "express";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
})

router.post("/logout",  (req: Request, res: Response) => {
    res.clearCookie("token").json({message: "Logged out successfully"});
})


export default router;