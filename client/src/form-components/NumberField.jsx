export const NumberField = ({label, minValue, maxValue, value, setFunction, canBeTyped}) => {
  return (
    <>
        <label>{label}</label>
        <div className = "input-number-container">
            <input type="number" value={value} readOnly={!canBeTyped} onChange={(e) => {
              if (maxValue > e.target.value && e.target.value >= minValue) {
                setFunction(parseInt(e.target.value));
              } else if (e.target.value >= maxValue) {
                setFunction(maxValue);
              }
            }} placeholder={minValue} />
            <button type="button" onClick={() => setFunction(prev => Math.max(minValue, prev - 1))} disabled={value === minValue || isNaN(value)}>-</button>
            <button type="button" onClick={() => setFunction(prev =>{
              if (isNaN(prev))
                return minValue+1;
              if (maxValue>prev)
                return prev + 1
              return prev;
            })} disabled={value === maxValue}>+</button>
        </div>
    </>
  );
}