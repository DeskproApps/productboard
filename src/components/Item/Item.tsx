import styled from 'styled-components';
import { HorizontalDivider } from '@deskpro/app-sdk';
import { Checkbox } from '@deskpro/deskpro-ui';
import Info from './Info';
import { Item as ItemType } from '@/types';

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
`;

const Media = styled.div``;

const Body = styled.div`
    width: calc(100% - 12px - 8px);
`;

interface Item {
    item: ItemType;
    checked: boolean;
    onChange: () => void;
};

function Item({ item, checked, onChange }: Item) {
    return (
        <>
            <Container>
                <Media>
                    <Checkbox
                        containerStyle={{marginTop: 4}}
                        size={12}
                        checked={checked}
                        onChange={onChange}
                    />
                </Media>
                <Body>
                    <Info
                        item={item}
                        onTitleClick={onChange}
                    />
                </Body>
            </Container>
            <HorizontalDivider style={{marginBottom: 9}} />
        </>
    );
};

export default Item;