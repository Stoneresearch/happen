// src/app/dashboard/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardContent from './DashboardContent';

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
