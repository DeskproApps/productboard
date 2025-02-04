import { P1 } from '@deskpro/deskpro-ui';

interface NoFound {
    text?: string
};

function NoFound({ text = 'No Found' }: NoFound) {
    return <P1>{text}</P1>
};

export default NoFound;