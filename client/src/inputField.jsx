import {useState} from 'react'

export const InputField = ({type, id, label, placeholder, value, onChange}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <div className="Field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
    </div>
  );
}