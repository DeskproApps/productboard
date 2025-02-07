import styled from 'styled-components';

const Link = styled.a`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.cyan100};
`;

export default Link;