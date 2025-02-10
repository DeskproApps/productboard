import { IDeskproClient } from '@deskpro/app-sdk';

interface GetLinkedDeskproEntitiesCount {
    id: string;
    client: IDeskproClient;
};

async function getLinkedDeskproEntitiesCount({ id, client }: GetLinkedDeskproEntitiesCount) {
    return await client.entityAssociationCountEntities('linkedProductboardItems', id);
};

export default getLinkedDeskproEntitiesCount;