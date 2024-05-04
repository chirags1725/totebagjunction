import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
  name:{type:String},
  phone:{type:String},
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema); // Prevent redefinition of model

export default async function handler(req, res) {
  await mongoose.connect('mongodb+srv://totebagjunction:totebag@e-commerce.enw411g.mongodb.net/users');

  if (req.method === 'POST') {
    const {name, phone, email, password } = req.body;

    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ name, phone,email, password: hashedPassword });
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}