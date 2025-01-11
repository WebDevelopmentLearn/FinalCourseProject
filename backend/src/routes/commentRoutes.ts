import {NextFunction, Router, Request, Response} from "express";

const router: Router = Router();

router.post("/create-comment", async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
});



export default router;