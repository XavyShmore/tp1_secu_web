import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Sign out successful', status: 200 });

    response.cookies.set('user', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,  // Set the cookie to expire immediately
        path: '/',
    });

    return response;
}
