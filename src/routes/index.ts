import express from 'express';
import startFun from "../controllers/startController";
import userRoute from "./user_routes/userRoute"
const router = express.Router();
router.get('/', startFun );
router.use('/user', userRoute)
export default router