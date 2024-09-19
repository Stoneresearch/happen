// src/components/ProtectedRoute.tsx
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!user) {
        router.push('/sign-in');
        return null;
    }

    return <>{children}</>;
}
