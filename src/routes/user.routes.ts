import express from 'express';
import { register, verifyEmail, login, getUsers, updateUserStatus, deleteUser } from '../controllers/user.controller';
import verifyAdmin from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/verifyEmail', verifyEmail);

router.get("/getAllUsers", getUsers);

router.put('/update-status/:userId',verifyAdmin, updateUserStatus);

router.delete('/delete-user/:userId', verifyAdmin, deleteUser);


export default router;
