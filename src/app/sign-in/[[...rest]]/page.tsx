// src/app/sign-in/page.tsx
'use client';

import { ClerkProvider, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const router = useRouter();

    const handleSignInSuccess = () => {
        router.push('/dashboard'); // Redirect to dashboard on success
    };

    return (
        <ClerkProvider>
            <div className="flex flex-col items-center justify-center h-screen bg-background">
                <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                <SignIn
                    path="/sign-in"
                    routing="path"
                    afterSignInUrl="/dashboard"
                    signUpUrl="/sign-up"
                />
            </div>
        </ClerkProvider>
    );
}
