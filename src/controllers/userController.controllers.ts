import { Request, Response } from 'express';
import userModels from '../models/user.models';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userModels.create(req.body); 
      const userWithoutPassword = { ...user.toObject() };
      return res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userModels.find({}, 'username fullName age email address');
      return res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const user = await userModels.findOne({ userId }, '-password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  // Add other controller methods for updating and deleting users

}

export default new UserController();
