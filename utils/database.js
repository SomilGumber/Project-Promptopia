import mongoose from 'mongoose';

let isConnected = false;

const connectToDB = async () => {
  if (isConnected) {
    console.log('Already connect to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
    });

    isConnected = true;

    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;
