import mongoose from 'mongoose';
import env from './env.config.js';
import { colorText } from '../utils/color-text.utils.js';

async function connectDb() {
  try {
    const conn = await mongoose.connect(env.MONGODB);
    console.log(colorText(`Database connected`, 'black', 'green'));
  } catch (error) {
    console.log(colorText('Error in database connection:', 'red'), error);
  }
}

export default connectDb;
