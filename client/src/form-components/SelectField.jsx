import Select from 'react-select'

export const SelectField = ({id, placeholder, value, options, onChange}) => {
  const selectedValue = options.find(opt => opt.value === value) || null;

  return (
    <div className="form-field">
      <Select 
        id={id}
        classNamePrefix="my-react-select"
        placeholder={placeholder}
        value={selectedValue}
        options={options}
        onChange={onChange}
        isSearchable={true}
        isClearable={true}
      />
    </div>
  );
}