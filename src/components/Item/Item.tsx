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
    showCheckbox?: boolean;
    checked?: boolean;
    onCheck?: () => void;
    onTitleClick?: () => void;
};

function Item({
    item,
    showCheckbox = true,
    checked = false,
    onCheck,
    onTitleClick
}: Item) {
    return (
        <>
            <Container>
                <Media>
                    {showCheckbox && <Checkbox
                        containerStyle={{marginTop: 4}}
                        size={12}
                        checked={checked}
                        onChange={onCheck}
                    />}
                </Media>
                <Body>
                    <Info
                        item={item}
                        onTitleClick={onTitleClick}
                    />
                </Body>
            </Container>
            <HorizontalDivider style={{marginBottom: 9}} />
        </>
    );
};

export default Item;