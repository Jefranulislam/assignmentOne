import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/create', UserController.createUser);
// Add other routes here

export default router;
