import { memo } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = memo(({ value, onChange, placeholder = 'Search...' }) => {
  return <input type='text' value={value} onChange={onChange} placeholder={placeholder} className='border border-gray-300 p-2 rounded-lg w-full sm:w-1/2 mb-4 sm:mb-0' />;
});

export default SearchInput;
