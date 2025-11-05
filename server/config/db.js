import mongoose from 'mongoose';

// To connect with MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todoDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host} + PORTi is : `, 5000);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;