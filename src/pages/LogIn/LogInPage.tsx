import LogIn from './LogIn';
import { useLogIn } from '@/hooks';

function LogInPage() {
    const { authURL, isLoading, poll } = useLogIn();

    return <LogIn authURL={authURL} isLoading={isLoading} onLogIn={poll} />
};

export default LogInPage;