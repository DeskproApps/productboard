import { Title } from '@deskpro/app-sdk';
import { AnchorButton } from '@deskpro/deskpro-ui';
import { Container } from '@/components';
import { useLogIn } from '@/hooks';

function LogInPage() {
    const { authURL, isLoading, onLogIn } = useLogIn();

    return (
        <Container>
            <Title title='Log into Productboard' />
            <AnchorButton
                text='Log In'
                target='_blank'
                href={authURL ?? '#'}
                loading={!authURL || isLoading}
                disabled={!authURL || isLoading}
                onClick={onLogIn}
            />
        </Container>
    );
};

export default LogInPage;