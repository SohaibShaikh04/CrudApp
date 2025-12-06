import { RequestHandler } from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { generateToken } from '../middleware/auth';
import { SignupRequest, LoginRequest, AuthResponse } from '@shared/api';

// Validation schemas
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const handleSignup: RequestHandler = async (req, res) => {
  try {
    const body = signupSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create new user
    const user = new User({
      email: body.email,
      name: body.name,
      password: body.password,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString(), user.email);

    const response: AuthResponse = {
      success: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
    }
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const body = loginSchema.parse(req.body);

    // Find user
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(body.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.email);

    const response: AuthResponse = {
      success: true,
      token,
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
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
