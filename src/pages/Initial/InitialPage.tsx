import { useNavigate } from 'react-router-dom';
import { LoadingSpinner, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { Container } from '@/components';
import { useStore } from '@/context/Store';
import { useAsyncError } from '@/hooks';
import { checkIsAuth } from '@/services';

function InitialPage() {
    const [_, dispatch] = useStore();
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();

    useInitialisedDeskproAppClient(client => {
        checkIsAuth(client)
            .then(isAuth => {
                dispatch({type: 'setAuth', payload: isAuth});
                navigate(isAuth ? '/home' : '/log_in');
            })
            .catch(asyncErrorHandler);
    });

    return (
        <Container>
            <LoadingSpinner />
        </Container>
    );
};

export default InitialPage;