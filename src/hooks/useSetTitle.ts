import { useInitialisedDeskproAppClient } from '@deskpro/app-sdk';

function useSetTitle(title: string) {
    useInitialisedDeskproAppClient(client => {
        client.setTitle(title);
    }, [title]);
};

export default useSetTitle;