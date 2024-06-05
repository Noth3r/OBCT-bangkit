import {Router} from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import { auth } from '../middlewares/auth';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', auth, userRouter)

export default router;