import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeskproAppClient, useDeskproLatestAppContext } from '@deskpro/app-sdk';
import { useAsyncError } from '@/hooks';
import { ENTITY_ASSOCIATION_NAME } from '@/constants';
import { Item, TicketData } from '@/types';

function useUnlinkItem() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<TicketData, unknown>();
    const ticketID = context?.data?.ticket.id;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { asyncErrorHandler } = useAsyncError();

    const unlink = useCallback((item: Item) => {
        if (!client || !ticketID) return;

        setIsLoading(true);

        return client
            .getEntityAssociation(ENTITY_ASSOCIATION_NAME, ticketID)
            .delete(item.id)
            .catch(asyncErrorHandler)
            .finally(() => {
                setIsLoading(false);
                navigate('/home');
            });
    }, [client, ticketID, asyncErrorHandler, navigate]);

    return {
        unlink,
        isLoading
    };
};

export default useUnlinkItem;