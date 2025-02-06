import { useNavigate } from 'react-router-dom';
import { LoadingSpinner, useDeskproElements, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { Container } from '@/components';
import { useStore } from '@/context/Store';
import { checkIsAuth } from '@/services';

function InitialPage() {
    const [_, dispatch] = useStore();
    const navigate = useNavigate();

    useInitialisedDeskproAppClient(client => {
        checkIsAuth(client)
            .then(isAuth => {
                dispatch({type: 'setAuth', payload: isAuth});
                navigate(isAuth ? '/home' : '/log_in');
            });
    });

    return (
        <Container>
            <LoadingSpinner />
        </Container>
    );
};

export default InitialPage;