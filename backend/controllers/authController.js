import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from "bcryptjs";


const sendTokenResponse = (user, token, statusCode, res) => {
  res.cookie('token', token, {
    httpOnly: true,                                      
    secure: process.env.NODE_ENV === 'production',       
    sameSite: 'strict',                                  
    maxAge: 7 * 24 * 60 * 60 * 1000                    
  });

  res.status(statusCode).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name, email,
      password: hashedPassword,  
      role
    });

    const token = generateToken(user._id, user.role);

    sendTokenResponse(user, token, 201, res);  

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    sendTokenResponse(user, token, 200, res);  

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)    
  });
  res.json({ message: 'Logged out successfully' });
};