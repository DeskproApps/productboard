import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { Feature,  } from '@/types';

interface GetFeaturesResponse {
    data: {
        id: string;
        name: string;
        links: {
            html: string;
        };
        owner: {
            email: string;
        };
        status: {
            name: string;
        };
        timeframe: {
            endDate: string;
        };
    }[];
    links: {
        next: string | null;
    };
};

interface GetFeatures {
    client: IDeskproClient;
};

async function getFeatures({ client }: GetFeatures): Promise<Feature[]> {
    try {
        let features: Feature[][] = [];
        let nextPage: string | null = '/features';

        while (nextPage) {
            const response: GetFeaturesResponse = await baseRequest<GetFeaturesResponse>({
                client,
                endpoint: nextPage
            });

            const mappedFeatures = response.data.map(feature => {
                const timeframe = isNaN(Date.parse(feature.timeframe.endDate))
                    ? '—'
                    : new Date(feature.timeframe.endDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });
                
                return {
                    id: feature.id,
                    name: feature.name,
                    link: feature.links.html,
                    owner: feature.owner.email,
                    status: feature.status.name,
                    timeframe
                };
            });

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

        return [];
    };
};

export default getFeatures;