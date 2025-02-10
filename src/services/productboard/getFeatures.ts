import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { getTimeframe } from './utilities/timeframe';
import { Feature, Parent, TimeframeObject } from '@/types';

type GetFeaturesResponse = {
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
        parent: {
            [key in Parent]: {
                id: string;
            };
        };
    }[];
    links: {
        next: string | null;
    };
};

interface GetFeatures {
    client: IDeskproClient;
};

async function getFeatures({ client }: GetFeatures): Promise<Feature[] | undefined> {
    try {
        let features: Feature[][] = [];
        let nextPage: string | null = '/features';

        while (nextPage) {
            const response: GetFeaturesResponse = await baseRequest<GetFeaturesResponse>({
                client,
                endpoint: nextPage
            });

            const mappedFeatures = response.data.map(feature => ({
                id: feature.id,
                name: feature.name,
                description: feature.description,
                link: feature.links.html,
                owner: feature.owner.email,
                status: feature.status.name,
                timeframe: getTimeframe(feature.timeframe),
                parent: feature.parent
            }));

            features.push(mappedFeatures);

            const nextLink = response.links?.next;

            if (nextLink) {
                const next = new URL(nextLink);

                nextPage = next.pathname + next.search;
            } else {
                nextPage = null;
            };
        };

        return features.flat();
    } catch (error: any) {
        console.log('error getting features:', error);

        return undefined;
    };
};

export default getFeatures;