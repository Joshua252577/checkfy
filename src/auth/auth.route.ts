import {Router, Request, Response, NextFunction} from "express";
import {AuthController} from "./auth.controller";

const router = Router();

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const {user, token} = await AuthController.authenticate(req.body);
        res.status(200).cookie("user", token, {
            httpOnly: true,
            secure: true,
            maxAge: (30 * 24 * 60 * 60 * 1000)
        }).json({ user, token });
    }catch (err) {
        next(err)
    }
});

export default router;
