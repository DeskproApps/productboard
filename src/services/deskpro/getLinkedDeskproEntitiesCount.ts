import { IDeskproClient } from '@deskpro/app-sdk';
import { ENTITY_ASSOCIATION_NAME } from '@/constants';

interface GetLinkedDeskproEntitiesCount {
    id: string;
    client: IDeskproClient;
};

async function getLinkedDeskproEntitiesCount({ id, client }: GetLinkedDeskproEntitiesCount) {
    return await client.entityAssociationCountEntities(ENTITY_ASSOCIATION_NAME, id);
};

export default getLinkedDeskproEntitiesCount;