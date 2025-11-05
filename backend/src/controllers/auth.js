import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/user.js';

export const register = async (req, res) => {
  try {
    console.log('alllloo from regiseter');
    
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    console.log('alllloo from regiseter');
    // return res.status(400).json({ message: "ouiiii end point khdammma"});

    const { username, email, password, role = 'user' } = req.body;

    console.log('username: ',username);
    console.log('email: ',email);
    console.log('password: ',password);
    // console.log('username: ',username);
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser ) {
        return res.status(400).json({ message: 'User already exists with this email' });
    }
    const existingusername = await User.findByUsername(username);
    if (existingusername ) {
        return res.status(400).json({ message: 'User already exists with this username' });
    }
    // new niga in db
    const user = await User.create({ username, email, password, role });

    // jwtiiiii hhhh
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req, res) => {
  try {
    // wa9ila no need for now, already checked in the front, postmaaaaan
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};