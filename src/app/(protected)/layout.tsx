import { getCurrentUser } from '@/src/server-actions/getCurretnUser';
import { redirect } from 'next/navigation';

import React from 'react'

const ProtectedLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }
    return (
        <>{children}</>
    )
}

export default ProtectedLayout