import { useDeskproElements } from '@deskpro/app-sdk';
import LogIn from './LogIn';
import { useLogIn } from './useLogIn';

function LogInPage() {
    const { authURL, poll } = useLogIn();

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements();
        registerElement('refreshButton', {type: 'refresh_button'});
    });

    return <LogIn authURL={authURL} isLoading={false} onLogIn={poll} />
};

export default LogInPage;