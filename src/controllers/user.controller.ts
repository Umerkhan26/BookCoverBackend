import { Request, Response } from 'express';
import { registerUser, verifyUserEmail, loginUser, getAllUsers, updateUserStatusService,deleteUserService  } from '../services/user.service';
import User,{ IUser } from '../models/user.model';
import { AuthRequest } from '../types/AuthRequest.types';

export const register = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await registerUser(userData);
    
    res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
      user,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Error registering user' });
  }
};

export const verifyEmail = async (req: Request, res: Response):Promise<any> => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    
    const user = await verifyUserEmail(token as string); 
    console.log("Token:", user);

    res.status(200).json({ message: 'Email verified successfully!', user });
  } catch (error: any) {
    res.status(error.statusCode || 400).json({ message: error.message || 'Failed to verify email' });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const loginData = await loginUser(email, password);

    res.status(200).json({ message: 'Login successful', ...loginData });
  } catch (error: any) {
    res.status(error.statusCode || 400).json({ message: error.message || 'Login failed' });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch users" });
  }
};



export const updateUserStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'admin') {  
      res.status(403).json({ message: 'Access denied. Only admins are allowed' });
      return;
    }

    const { userId } = req.params;
    const { status } = req.body; 
    console.log("Request received:", req.params, req.body);

    const user = await User.findOne({ userId });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.status = status; 
    await user.save();

    res.status(200).json({ message: 'User status updated successfully', user });
  } catch (error:any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const { userId } = req.params;

    if (!req.user || req.user.role !== 'admin') {  
      return res.status(403).json({ message: 'Access denied. Only admins can delete users.' });
    }

    const deletedUser = await deleteUserService(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error:any) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
