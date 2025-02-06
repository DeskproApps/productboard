import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { Objective } from '@/types';

interface GetObjectivesResponse {
    data: {
        id: string;
        name: string;
        links: {
            html: string;
        };
    }[];
    links: {
        next: string | null;
    };
};

interface GetObjectives {
    client: IDeskproClient;
};

async function getObjectives({ client }: GetObjectives): Promise<Objective[]> {
    try {
        let objectives: Objective[][] = [];
        let nextPage: string | null = '/objectives';

        while (nextPage) {
            const response: GetObjectivesResponse = await baseRequest<GetObjectivesResponse>({
                client,
                endpoint: nextPage
            });

            const mappedObjectives = response.data.map(objective => ({
                id: objective.id,
                name: objective.name,
                link: objective.links.html,
            }));

            objectives.push(mappedObjectives);

            const nextLink = response.links?.next;

            if (nextLink) {
                const next = new URL(nextLink);

                nextPage = next.pathname + next.search;
            } else {
                nextPage = null;
            };
        };

        return objectives.flat();
    } catch (error: any) {
        console.log('error getting objectives:', error);

        return [];
    };
};

export default getObjectives;