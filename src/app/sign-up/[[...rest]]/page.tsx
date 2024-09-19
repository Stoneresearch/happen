// src/app/sign-up/page.tsx
'use client';

import { ClerkProvider, SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();

    const handleSignUpSuccess = () => {
        router.push('/dashboard'); // Redirect to dashboard on success
    };

    return (
        <ClerkProvider>
            <div className="flex flex-col items-center justify-center h-screen bg-background">
                <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
                <SignUp
                    onSignUp={handleSignUpSuccess} // Use the correct success handler for sign-up
                    routing="path" // Changed routing from "hash" to "path" for better UX
                    afterSignUpUrl="/dashboard" // Clerk redirect after sign-up
                    signInUrl="/sign-in" // Link to sign-in page
                />
            </div>
        </ClerkProvider>
    );
}
