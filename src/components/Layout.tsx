// src/components/Layout.tsx
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type Props = {
    children: React.ReactNode;
    onLogout: () => void;
};

export default function Layout({ children, onLogout }: Props) {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded || !user) {
            onLogout();
        }
    }, [isLoaded, user, onLogout]);

    if (!isLoaded || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {children}
        </div>
    );
}
