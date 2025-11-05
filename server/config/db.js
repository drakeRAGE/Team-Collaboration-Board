import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// To connect with MongoDB
const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host} + PORTi is : `, process.env.PORT);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;