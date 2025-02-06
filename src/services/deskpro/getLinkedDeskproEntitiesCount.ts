import { IDeskproClient } from '@deskpro/app-sdk';

interface GetLinkedDeskproEntitiesCount {
    ID: string;
    client: IDeskproClient;
};

async function getLinkedDeskproEntitiesCount({ ID, client }: GetLinkedDeskproEntitiesCount) {
    return await client.entityAssociationCountEntities('linkedProductboardItems', ID);
};

export default getLinkedDeskproEntitiesCount;