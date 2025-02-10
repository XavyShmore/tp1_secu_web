import { NextResponse } from 'next/server';

export async function POST() {
    // This would typically be the user ID or another identifier
    const response = NextResponse.json({ message: 'Déconnexion réussie', status: 200 });

    // Clear the 'user' cookie
    response.cookies.set('user', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: -1,  // Set the cookie to expire immediately
        path: '/',
    });

    return response;
}
