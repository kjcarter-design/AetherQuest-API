import express from 'express';
import { userController } from '../controllers/UserController';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export default router;
