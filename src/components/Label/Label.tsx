import { FC } from 'react';
import styled from 'styled-components';
import { LabelProps, Label as UILabel } from '@deskpro/deskpro-ui';

interface Label extends LabelProps {
    marginBottom?: number;
};

const Label: FC<Label> = styled(UILabel)`
    margin-bottom: ${({ marginBottom = 10 }: Label) => marginBottom}px;
`;

export default Label;