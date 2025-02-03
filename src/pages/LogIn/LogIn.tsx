import { Title } from '@deskpro/app-sdk';
import { AnchorButton } from '@deskpro/deskpro-ui';
import { Container } from '@/components';

interface LogIn {
    authURL: string | null;
    isLoading: boolean;
    onLogIn: () => void;
};

function LogIn({ authURL, isLoading, onLogIn }: LogIn) {
    return (
        <Container>
            <Title title='Log into ProductBoard' />
            <AnchorButton
                text='Log In'
                target='_blank'
                href={authURL ?? '#'}
                loading={isLoading}
                disabled={!authURL || isLoading}
                onClick={onLogIn}
            />
        </Container>
    );
};

export default LogIn;