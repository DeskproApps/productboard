import { isValidElement, ReactElement } from 'react';
import styled from 'styled-components';
import { P5, P8, Stack } from '@deskpro/deskpro-ui';

export interface ITextBlockWithLabel {
    marginBottom?: number;
    label?: string | ReactElement;
    text?: string | number | ReactElement;
};

const Container = styled.div<ITextBlockWithLabel>`
    margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;

const Label = styled(P8)`
    color: ${({ theme }) => (theme.colors.grey80)};
`;

function TextBlockWithLabel({ marginBottom = 10, label, text }: ITextBlockWithLabel) {
    let textBlock: ReactElement | null = null;

    if (typeof text === 'string' || typeof text === 'number') textBlock = <P5>{text}</P5>;
    else if (isValidElement(text)) textBlock = <Stack gap={5} align='baseline'>{text}</Stack>;
    
    return (
        <Container marginBottom={marginBottom}>
            {label && <Label>{label}</Label>}
            {textBlock}
        </Container>
    );
};

export default TextBlockWithLabel;