import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.delete('/', UserController.deleteUser);

export default router;
