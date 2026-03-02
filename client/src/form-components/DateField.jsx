import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';


export const DateField = ({id, label, value, onChange, today, departureDate, returnDate}) => {
  return (
    <div className="date-field">
      {value === null ? <IconCalendar className="date-icon"/> : null}
      <DatePickerInput
        popoverProps={{
          classNames: {
            dropdown: 'date-dropdown'
          }
        }}
        classNames={{
          input: 'date-input',
          label: 'date-label',
          placeholder: 'date-placeholder'
        }}
        label={label}
        placeholder="Pick a date"
        value={value} 
        minDate = {(departureDate&&label==="Return")? departureDate : today}
        onChange={onChange} 
        style={{ width: '100%' }}
      />
    </div>
  );
}