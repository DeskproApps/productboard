import { IDeskproClient } from '@deskpro/app-sdk';

interface GetRegisteredItemIDs {
    client: IDeskproClient;
    ticketID: string;  
};

async function getRegisteredItemIDs({ client, ticketID }: GetRegisteredItemIDs) {
    if (!client || !ticketID) return [];

    const linkedIDs = await client.getEntityAssociation('linkedProductboardItems', ticketID).list();

    return linkedIDs;
};

export default getRegisteredItemIDs;