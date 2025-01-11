import {NextFunction, Router, Request, Response} from "express";

const router: Router = Router();

router.post("/like", async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
});



export default router;