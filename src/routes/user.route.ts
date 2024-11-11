import {Router, Request, Response} from "express";

const router = Router();

router.get('/', async function (req: Request, res: Response) {
    res.status(200).send('ROTA DE USUÀRIOs')
})


export default router;
