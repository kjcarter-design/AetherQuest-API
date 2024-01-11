import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', userController.register);
router.get('/user/:id', userController.getUserProfile);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export default router;
