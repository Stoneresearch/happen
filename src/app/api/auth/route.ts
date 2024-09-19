// src/app/api/auth/route.ts

import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function GET(request: Request) {
    const { userId } = request.cookies.get()

    if (!userId) {
        return NextResponse.json({ success: false, error: 'Not authenticated' })
    }

    const user = await clerkClient.getUser(userId)

    if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' })
    }

    return NextResponse.json({ success: true, user })
}
