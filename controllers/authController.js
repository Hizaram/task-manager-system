import User from '../models/User';
import { verify } from 'jsonwebtoken';
import { bcrypt } from 'bcrypt';
import formatResponse from '../helpers/formatResponse';
import AppError from '../helpers/AppError';
import handleValidationError from '../helpers/handleValidationError';
import generateJWToken from '../helpers/generateJWToken';


class AuthController {
    // define signup function
    static async signup(req, res, next) {
        try {
            pwd = req.body.password;
            const hashedPassword = await bcrypt.hash(pwd, 10);
            const newUser = new User({
                email: req.body.email,
                email: req.body.email,
                password: hashedPassword,
	    });
	
	    await newUser.save();
	    return res.status(201).json({
               status: 'success',
               data: formatResponse(newUser),
               });
         } catch (err) {
            let errors;
            if (err.name === 'ValidationError') {
                errors = handleValidationError(err, req);
                return res.status(400).json({
                      error: { ...errors },
                      });
            }
            return next(err);
        }
    }
    // login function implementation
    static async login(req, res, next) {
       const { email, password } = req.body;
        try {
            if (!email|| !password) {
                return next(new AppError('Invalid login credentials', 400));
                }
            let user = await User.findOne({ email});
            if (!user) {
                return next(new AppError('User not found', 404));
                }
            user = await User.findOne({ email, password });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return next(new AppError('Invalid login credentials', 400));
                }
            const token = generateJWToken(user._id.toString());
	    return res.status(200).send({ token, user: formatResponse(user) });
        } catch (error) {
              next(error);
          }
    }
    // Handle route protection from unauthorised requests
    static async protect(req, res, next) {
        let token;
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new AppError('Unauthorised', 401));
        }
        if (authorization.startsWith('Bearer ')) {
            token = authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
              token = req.cookies.jwt;
          }
        if (!token) {
            return next(new AppError('Unauthorised', 401));
        }
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            const CurrentUser = await User.findOne({
                                           _id: decoded.userid,
                                    });
            if (!CurrentUser) {
                return next(new AppError('Unauthorised', 401));
            }
            req.user = formatResponse(CurrentUser);
            req.headers.user = formatResponse(CurrentUser);
            next();
        } catch (error) {
              if (error.message === 'invalid signature') {
                  return next(new AppError('Unauthorised', 401));
              }
              if (error.message === 'jwt malformed') {
                  return next(new AppError('Server error...', 500));
              }
              return next(error);
           }
    } 
}

export default AuthController;
