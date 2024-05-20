// models/Task.js
import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true }

});

const Task = model('Task', taskSchema);

/**import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from "./Customer";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Customer, customer => customer.products)
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;
}**/

export default Task;
