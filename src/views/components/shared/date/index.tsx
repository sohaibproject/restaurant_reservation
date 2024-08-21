interface DateInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, placeholder = 'Start Date' }) => {
  return (
    <div className='flex flex-col '>
      <label className='font-semibold'>{placeholder ?? 'date'} :</label>
      <input type='date' value={value} onChange={onChange} placeholder={placeholder} className='border border-gray-300 p-2 rounded-lg' />
    </div>
  );
};

export default DateInput;
