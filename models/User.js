import { Schema, model } from 'mongoose';
import validator from 'validator';


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Pls, provide your username'],
    },
    email: {
        type: String,
        required: [true, "Please, provide your email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Kindly provide a password'],
        minLength: [8, 'Minimum length should be 8'],
        select: false,
    },
    /**passwordConfirmation: {
        type: String,
        required: [true, 'Kindly re-enter your password'],
        validate: {
            validator(el) {
                return this.password === el;
            },
            message: 'Password are not the same!',
        },
    },**/
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },

    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task' 
      }]
});

// Pre middleware to delete tasks associated with a user
userSchema.pre('remove', async function(next) {
    try {
      await this.model('Task').deleteMany({ user: this._id });
      next();
    } catch (error) {
      next(error);
    }
  });

const User = model('User', userSchema);
export default User;

/**import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  username: string = "";

  @Column()
  password: string = "";

  @Column()
  createdAt: Date = Date.now();

  @OneToMany(() => Product, product => product.user)
  products!: Product[];
}**/