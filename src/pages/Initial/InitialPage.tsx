import { useAuthentication } from '@/hooks';
import { LogInPage } from '@/pages';

function InitialPage() {
    const { isAuthenticated } = useAuthentication();

    return (
        <>
            {isAuthenticated ? (
                <>Logged In</>
            ) : (
                <LogInPage />
            )}
        </>
    );
};

export default InitialPage;