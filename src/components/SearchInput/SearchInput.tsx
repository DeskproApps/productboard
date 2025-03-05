import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Input, IconButton } from '@deskpro/deskpro-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Label } from '@/components';

interface SearchInput {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    isFetching?: boolean;
    onChange?: (search: string) => void;
};

function SearchInput({
    label,
    required = false,
    disabled = false,
    isFetching = false,
    onChange
}: SearchInput) {
    const [search, setSearch] = useState('');

    const onChangeSearch = useCallback(({ target: { value: query } }: ChangeEvent<HTMLInputElement>) => {
        setSearch(query);
    }, []);

    const onClearSearch = useCallback(() => {
        setSearch('');
    }, []);

    useEffect(() => {
        onChange?.(search);
    }, [onChange, search]);

    return (
        <Label
            label={label}
            htmlFor='search'
            required={required}
        >
            <Input
                id='search'
                name='search'
                value={search}
                disabled={disabled}
                onChange={onChangeSearch}
                leftIcon={isFetching ? <FontAwesomeIcon icon={faSpinner} spin /> : faSearch}
                rightIcon={<IconButton icon={faTimes} minimal onClick={onClearSearch} />}
            />
        </Label>
    );
};

export default SearchInput;