import { useNavigate } from 'react-router-dom';
import { LoadingSpinner, useDeskproElements, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { Container } from '@/components';
import { useStore } from '@/context/Store';
import { checkIsAuth } from '@/services';

function InitialPage() {
    const [_, dispatch] = useStore();
    const navigate = useNavigate();

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements();
        registerElement('refreshButton', {type: 'refresh_button'});
    });

    useInitialisedDeskproAppClient(client => {
        checkIsAuth(client)
            .then(isAuth => {
                dispatch({type: 'setAuth', payload: isAuth});
                navigate(isAuth ? '/link_items' : '/log_in');
            });
    });

    return (
        <Container>
            <LoadingSpinner />
        </Container>
    );
};

export default InitialPage;