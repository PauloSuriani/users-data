import { Router } from 'express';
import { create, find, list } from '../controllers/user';

const router = Router();

router.route('/user').get(list).post(create);
router.route('/user/:id').get(find);

export default router;
