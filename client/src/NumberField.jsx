export const NumberField = ({label, minValue, value, setFunction, canBeTyped, onChange}) => {
  return (
    <>
        <label>{label}</label>
        <div className = "input-number-container">
            <input type="number" value={value} readOnly={!canBeTyped} onChange={onChange} placeholder={minValue} />
            <button type="button" onClick={() => setFunction(prev => Math.max(minValue, prev - 1))} disabled={value === minValue || isNaN(value)}>-</button>
            <button type="button" onClick={() => setFunction(prev =>{
              if (isNaN(prev))
                return minValue+1;
              return prev + 1}
            )}>+</button>
        </div>
    </>
  );
}