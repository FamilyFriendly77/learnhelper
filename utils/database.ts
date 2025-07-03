import mongoose from 'mongoose';
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '', {
      dbName: 'LearnHelper',
    });
  } catch (error) {
    console.log(error);
  }
};
