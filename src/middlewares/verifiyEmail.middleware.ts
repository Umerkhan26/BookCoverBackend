import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import crypto from 'crypto';

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Mark the user's email as verified
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error:any) {
    res.status(500).json({ message: 'Error verifying email', error: error.message });
  }
};
