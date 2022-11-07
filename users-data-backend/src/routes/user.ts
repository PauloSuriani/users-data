import { Router } from 'express';
import { create, find, list, erase, update, listBySellerId } from '../controllers/user';

const router = Router();

router.route('/user').get(list).post(create);
router.route('/user/:id').get(find);
router.route('/custommer/:id').get(listBySellerId);
router.route('/delete/:id').delete(erase);
router.route('/update/:id').put(update);

export default router;
