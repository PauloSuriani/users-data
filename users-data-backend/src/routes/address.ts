import { Router } from 'express';
import { create, find, list } from '../controllers/address';

const router = Router();

router.route('/address').get(list).post(create);
router.route('/address/:id').get(find);

export default router;
