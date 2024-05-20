//import { ObjectId } from 'mongodb';
import User from '../models/User';
import AppError from '../helpers/AppError';
import formatResponse from '../helpers/formatResponse';

class UserController {
    static async createUser(req, res, next) {
        return res.status(500).json({
             message:
             'This route is  not defined. Kindly, use /signup to create account',
        });
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await User.find();
            const data = users.map((user) => formatResponse(user));

            return res.status(200).json({
                results: users.length,
                users: data,
            });
        } catch (err) {
              return next(err);
          }
    }

    static async getUser(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                 return next(new AppError('User with this ID does not exist', 404));
            }

            return res.status(200).json({ user: formatResponse(user) });
        } catch (err) {
              return next(err);
          }
    }

    static async deleteUser(req, res, next) {
        try {
            const { userid } = req.headers;
            if (!userid) {
                return next(new AppError('Forbidden', 403));
            }
            const user = await User.findByIdAndDelete(userid);

            if (!user) {
                return next(new AppError('User with this ID does not exist', 404));
            }

            return res.status(204).end({ status: 'success' });
        } catch (err) {
              return next(err);
          }
    }
}

export default UserController;
