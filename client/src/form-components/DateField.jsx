import { DateErrorMessage } from './DateErrorMessage'
import { DatePickerInput } from '@mantine/dates';

export const DateField = ({id, label, placeholder, value, onChange, today, departureDate, returnDate}) => {
  return (
    <div className="date-field">
      <DatePickerInput
        classNames={{
          input: 'date-input',
          label: 'date-label',
        }}
        label={label}
        placeholder="Pick a date"
        value={value} 
        onChange={onChange} 
        style={{ width: '100%' }}
      />
      <DateErrorMessage 
        datetype={id} 
        departureDate={departureDate} 
        returnDate={returnDate} 
        today={today} 
      />
    </div>
  );
}