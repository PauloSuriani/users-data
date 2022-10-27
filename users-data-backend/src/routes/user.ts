import { Router } from 'express';
import { create, find, list, erase, update } from '../controllers/user';

const router = Router();

router.route('/user').get(list).post(create);
router.route('/user/:id').get(find);
router.route('/delete/:id').delete(erase);
router.route('/update/:id').put(update);

export default router;
