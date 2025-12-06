import { RequestHandler, Request } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware: RequestHandler = (req: AuthRequest, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_in_production';

    const decoded = jwt.verify(token, secret) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const generateToken = (userId: string, email: string): string => {
  const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_in_production';
  return jwt.sign({ id: userId, email }, secret, { expiresIn: '7d' });
};
