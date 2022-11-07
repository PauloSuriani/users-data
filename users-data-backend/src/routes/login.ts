import { Router } from 'express';
import { login, tokenVerify } from '../controllers/login';

const router = Router();

router.route('/login').post(login);
router.route('/login/validate').get(tokenVerify);

export default router;