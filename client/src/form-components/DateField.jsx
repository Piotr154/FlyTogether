import {useState} from 'react'
import { DateErrorMessage } from './DateErrorMessage'


export const DateField = ({id, label, placeholder, value, onChange, today, departureDate, returnDate}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <div className="FormField InputField">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
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