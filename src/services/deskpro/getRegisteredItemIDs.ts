import { IDeskproClient } from '@deskpro/app-sdk';
import { ENTITY_ASSOCIATION_NAME } from '@/constants';

interface GetRegisteredItemIDs {
    client: IDeskproClient;
    ticketID: string;  
};

async function getRegisteredItemIDs({ client, ticketID }: GetRegisteredItemIDs) {
    if (!client || !ticketID) return [];

    const linkedIDs = await client.getEntityAssociation(ENTITY_ASSOCIATION_NAME, ticketID).list();

    return linkedIDs;
};

export default getRegisteredItemIDs;