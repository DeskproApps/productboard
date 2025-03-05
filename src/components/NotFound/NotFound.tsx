import { P1 } from '@deskpro/deskpro-ui';

interface NotFound {
    text?: string
};

function NotFound({ text = 'Not Found' }: NotFound) {
    return <P1>{text}</P1>
};

export default NotFound;