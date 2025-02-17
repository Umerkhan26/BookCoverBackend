import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';

// ✅ Extend the Request type to include `user`
interface AuthRequest extends Request {
  user?: any;
}

const verifyAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.userId);
    console.log("decoded userId from verifyAdmin middleware",user)
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied: Only admins allowed' });
      return;
    }

    req.user = user; // ✅ Store user in `req`
    next(); // ✅ Call next() to move to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyAdmin;
