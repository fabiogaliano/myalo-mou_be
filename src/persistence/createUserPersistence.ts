import bcrypt from 'bcrypt';
import userModel, { CreateIUser } from '@/persistence/models/user.model';

// Create a new user and save it to the database
export default async ({ email, password }: CreateIUser) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email,
      password: hashedPassword,
    });

    return await newUser.save();
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
