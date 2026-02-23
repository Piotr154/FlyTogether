import Select from 'react-select'

export const SelectField = ({id, label, placeholder, value, options, onChange}) => {

  const selectedValue = options.find(opt => opt.value === value) || null;

  return (
    <div className="FormField SelectField">
      <label htmlFor={id}>{label}</label>
      <Select 
        id={id}
        classNamePrefix="my-react-select"
        placeholder={placeholder}
        value={selectedValue}
        options={options}
        onChange={onChange}
        isSearchable = {true}
        isClearable = {true}
      />
    </div>
  );
}