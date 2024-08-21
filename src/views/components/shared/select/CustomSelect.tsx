interface OptionProps {
  value: string;
  label: string;
}

interface SelectProps {
  options: OptionProps[];
  selectedStatus: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<SelectProps> = ({ options, selectedStatus, onChange }) => {
  return (
    <select value={selectedStatus} onChange={onChange} className='border border-gray-300 p-[10px] rounded-lg '>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
