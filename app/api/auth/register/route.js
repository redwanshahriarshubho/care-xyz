import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    
    const { name, email, contact, password, nid } = await req.json();

    // Validation
    if (!name || !email || !contact || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      contact,
      password: hashedPassword,
      nid: nid || ''
    });

    // Generate token
    const token = generateToken({ id: user._id, email: user.email });

    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        token
      },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 604800, // 7 days
      path: '/'
    });

    return response;

  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: 'Server error during registration' },
      { status: 500 }
    );
  }
}