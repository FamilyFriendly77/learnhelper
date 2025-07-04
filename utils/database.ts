import mongoose from 'mongoose';
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '', {
      dbName: 'LearnHelper',
    });
    console.log('Connected to db');
  } catch (error) {
    console.log(error);
  }
};
