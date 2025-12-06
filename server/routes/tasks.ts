import { RequestHandler } from 'express';
import { z } from 'zod';
import { Task } from '../models/Task';
import { AuthRequest } from '../middleware/auth';
import { CreateTaskRequest, UpdateTaskRequest, TasksResponse, TaskResponse } from '@shared/api';

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().default(''),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
});

export const handleGetTasks: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { status, search } = req.query;

    // Build filter
    const filter: any = { userId: req.user.id };
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Get tasks
    let query = Task.find(filter).sort({ createdAt: -1 });

    const tasks = await query.lean();

    // Filter by search if provided
    let filteredTasks = tasks;
    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase();
      filteredTasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    const response: TasksResponse = {
      success: true,
      tasks: filteredTasks.map((task) => ({
        ...task,
        _id: task._id.toString(),
        userId: task.userId.toString(),
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt?.toISOString() || task.createdAt.toISOString(),
      })),
    };

    res.json(response);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const handleCreateTask: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const body = createTaskSchema.parse(req.body);

    const task = new Task({
      ...body,
      userId: req.user.id,
    });

    await task.save();

    const response: TaskResponse = {
      success: true,
      task: {
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        userId: task.userId.toString(),
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
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
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const handleUpdateTask: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;
    const body = updateTaskSchema.parse(req.body);

    // Check if task belongs to user
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Update task
    Object.assign(task, body);
    await task.save();

    const response: TaskResponse = {
      success: true,
      task: {
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        userId: task.userId.toString(),
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
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
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const handleDeleteTask: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;

    // Check if task belongs to user
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Delete task
    await Task.deleteOne({ _id: id });

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
