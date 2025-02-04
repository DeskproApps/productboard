import styled from 'styled-components';
import { TextBlockWithLabel  } from '@/components';
import { ITextBlockWithLabel } from '../TextBlockWithLabel/TextBlockWithLabel';

const Container = styled.div`
    margin-bottom: -1px;
`;

const Side = styled.div`
    display: inline-block;
    width: calc(49% - 6px);
`;

const Divider = styled.div`
    display: inline-block;
    width: 1px;
    height: 2em;
    margin: 0 6px;
    background-color: ${({ theme }) => theme.colors.grey20};
`;

interface TwoSider {
    leftLabel: ITextBlockWithLabel['label'];
    leftText: ITextBlockWithLabel['text'];
    rightLabel: ITextBlockWithLabel['label'];
    rightText: ITextBlockWithLabel['text'];
};

function TwoSider({ leftLabel, leftText, rightLabel, rightText }: TwoSider) {
    return (
        <Container>
            <Side>
                <TextBlockWithLabel
                    label={leftLabel}
                    text={leftText}
                />
            </Side>
            <Divider />
            <Side>
                <TextBlockWithLabel
                    label={rightLabel}
                    text={rightText}
                />
            </Side>
        </Container>
    );
};

export default TwoSider;