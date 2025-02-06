import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { Product } from '@/types';

interface GetProductsResponse {
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

interface GetProducts {
    client: IDeskproClient;
};

async function getProducts({ client }: GetProducts): Promise<Product[]> {
    try {
        let products: Product[][] = [];
        let nextPage: string | null = '/products';

        while (nextPage) {
            const response: GetProductsResponse = await baseRequest<GetProductsResponse>({
                client,
                endpoint: nextPage
            });

            const mappedProducts = response.data.map(product => ({
                id: product.id,
                name: product.name,
                link: product.links.html,
            }));

            products.push(mappedProducts);

            const nextLink = response.links?.next;

            if (nextLink) {
                const next = new URL(nextLink);

                nextPage = next.pathname + next.search;
            } else {
                nextPage = null;
            };
        };

        return products.flat();
    } catch (error: any) {
        console.log('error getting products:', error);

        return [];
    };
};

export default getProducts;