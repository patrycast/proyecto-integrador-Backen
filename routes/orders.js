import { Router } from 'express';
import { createOrder, getOrders } from '../controller/orders.js';
import protect from '../middlewares/protect.js';
import hasErrors from '../middlewares/hasErrors.js';
import { orderValidation } from '../validations/order.js';

const router = Router();

router.post('/', [protect, orderValidation, hasErrors], createOrder);
router.get('/', protect, getOrders);

export default router;