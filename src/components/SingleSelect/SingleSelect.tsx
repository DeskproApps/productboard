import { Dropdown, Input } from '@deskpro/deskpro-ui';
import styled from 'styled-components';
import { faCaretDown, faCheck, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Label } from '@/components';
import { Option } from '@/types';

const InputStyled = styled(Input)`
    width: calc(100% - 22px);
`;

interface SingleSelect {
    label: string;
    hasError: boolean;
    value: any;
    onChange: (option: Option) => void;
    required: boolean;
    options: Option[]
};

function SingleSelect({
    label,
    hasError,
    value,
    onChange,
    required,
    options,
    ...props
}: SingleSelect) {
    return (
        <Dropdown
            fetchMoreText='Fetch More'
            autoscrollText='AutoScroll'
            selectedIcon={faCheck}
            externalLinkIcon={faExternalLinkAlt}
            placement='bottom-start'
            inputValue={value?.label || ''}
            onSelectOption={onChange}
            hideIcons
            options={options}
            {...props}
        >
            {({ inputProps, inputRef }) => (
                <Label label={label} required={required}>
                    <InputStyled
                        ref={inputRef}
                        variant='inline'
                        rightIcon={faCaretDown}
                        placeholder='Select Value'
                        error={hasError}
                        {...inputProps}
                    />
                </Label>
            )}
        </Dropdown>
    );
};

export default SingleSelect;