import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeskproAppClient, useDeskproLatestAppContext } from '@deskpro/app-sdk';
import { useAsyncError } from '@/hooks';
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
            .getEntityAssociation('linkedProductboardItems', ticketID)
            .delete(item.id)
            .catch(asyncErrorHandler)
            .finally(() => {
                setIsLoading(false);
                navigate('/link_items');
            })
    }, [client, ticketID]);

    return {
        unlink,
        isLoading
    };
};

export default useUnlinkItem;