import { Label, Input, IconButton, InputProps } from '@deskpro/deskpro-ui';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface InputSearch {
    value: string;
    label?: string;
    required?: boolean;
    onChange: InputProps['onChange'];
    onClear: () => void;
};

function InputSearch({
    value,
    label,
    required = false,
    onChange,
    onClear
}: InputSearch) {
    return (
        <Label
            style={{ marginBottom: 11 }}
            label={label}
            htmlFor='inputSearch'
            required={required}
        >
            <Input
                id='inputSearch'
                value={value}
                leftIcon={faSearch}
                rightIcon={<IconButton icon={faTimes} minimal onClick={onClear} />}
                onChange={onChange}
            />
        </Label>
    );
}

export default InputSearch;