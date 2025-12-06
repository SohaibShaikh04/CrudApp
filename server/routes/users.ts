import { RequestHandler } from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { ProfileResponse, UpdateProfileRequest } from '@shared/api';

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
});

export const handleGetProfile: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const response: ProfileResponse = {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const handleUpdateProfile: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const body = updateProfileSchema.parse(req.body);

    // Check if email is already taken (if updating email)
    if (body.email) {
      const existingUser = await User.findOne({
        email: body.email,
        _id: { $ne: req.user.id },
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const response: ProfileResponse = {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };

    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
    }
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
