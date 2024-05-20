// db.js
/**import "reflect-metadata";
import { DataSourceOptions, createConnection } from 'typeorm';
import express from "express";
import { Customer } from "../models/Customer";
import { Product } from "../models/Product";
import * as config from "./ormconfig.json";

const connectDB = createConnection({
  ...(config.database as DataSourceOptions),
  entities: [Customer, Product],
}).then(connection => {
  const Customer = connection.getRepository(Customer);
  const Product = connection.getRepository(Product);
  console.log('Connected to PostgreSQL database');
  })
  .catch(error => {
    console.error('Connection to database failed:', error);
  });

module.exports = connectDB;**/
import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
