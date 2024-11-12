import {Router, Request, Response, NextFunction} from "express";
import {UserController} from "../controllers/user.controller";

const router = Router();

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UserController.getAll();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
   try {
       const user = await UserController.getById(Number(req.params.id));
       res.status(200).json(user);
   } catch (err) {
       next(err);
   }
});

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserController.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserController.update(Number(req.params.id), req.body);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        await UserController.delete(Number(req.params.id));
        res.status(200).send('Deleted successfully');
    } catch (err) {
        next(err);
    }
})
export default router;