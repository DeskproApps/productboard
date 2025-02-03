import { useDeskproAppClient } from '@deskpro/app-sdk';
import { AUTHENTICATION_USER_STATE_PATH } from '@/constants';

async function getAuthenticationStatus() {
    const { client } = useDeskproAppClient();

    return new Promise(resolve => {
        setInterval(() => {
            client?.getUserState(AUTHENTICATION_USER_STATE_PATH)
                .then(state => {
                    const item = state.find(item => item.name === AUTHENTICATION_USER_STATE_PATH);

                    if (item?.data === 'true') resolve(true);
                });
        }, 1000);
    });
};

export default getAuthenticationStatus;