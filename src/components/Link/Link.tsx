import styled from 'styled-components';
import { DeskproTheme } from '@deskpro/deskpro-ui';

const Link = styled.a`
    text-decoration: none;
    color: ${({ theme }) => (theme as DeskproTheme).colors.cyan100};
`;

export default Link;