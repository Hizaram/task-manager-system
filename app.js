// app.js
import express from 'express';
import { json } from 'body-parser';
import connectDB from './db/dbase';
import { protect } from './controllers/authController';
import taskRouter from './routes/taskRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(json());

// Use protected routes for tasks
app.use(['/tasks', '/tasks/:id'], protect, taskRouter);

// Use auth router
app.use('/auth', authRouter);

// Use protected routes for users
app.use(['/users', '/users/:id'], protect, userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
