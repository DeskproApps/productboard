import { useState } from 'react';
import { HomePage, LinkItemsPage, LogInPage } from '@/pages';
import { getAuthenticationStatus } from '@/utils';

function InitialPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    getAuthenticationStatus()
        .then(isAuthenticated => {
            if (isAuthenticated === true) setIsLoggedIn(true);
        });

    return (
        <>
            {isLoggedIn ? (
                <LinkItemsPage />
            ) : (
                <LogInPage />
            )}
        </>
    );
};

export default InitialPage;