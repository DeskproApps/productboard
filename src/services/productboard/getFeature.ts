import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { getTimeframe } from './utilities/timeframe';
import { Feature, ParentObject, TimeframeObject } from '@/types';

type GetFeatureResponse = {
    data: {
        id: string;
        name: string;
        description: string;
        links: {
            html: string;
        };
        owner: {
            email: string;
        };
        status: {
            name: string;
        };
        timeframe: TimeframeObject;
        parent: ParentObject;
    };
};

interface GetFeature {
    id: string;
    client: IDeskproClient;
};

async function getFeature({ id, client }: GetFeature): Promise<Feature | undefined> {
    try {
        const response: GetFeatureResponse = await baseRequest<GetFeatureResponse>({
            client,
            endpoint: `/features/${id}`
        });

        if (!response.data) throw new Error('no features');

        const feature = response.data;

        return {
            id: feature.id,
            name: feature.name,
            description: feature.description,
            link: feature.links.html,
            owner: feature.owner.email,
            status: feature.status.name,
            timeframe: getTimeframe(feature.timeframe),
            parent: feature.parent
        };
    } catch (error: any) {
        console.log('error getting feature:', error);

        return undefined;
    };
};

export default getFeature;