import express, {Request, Response} from 'express';
import {register , login, refresh_token} from '../../controllers/userController'
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/refresh_token', refresh_token);
export default router