import {useState} from 'react'


export const NumberField = ({label, minValue, value, setFunction}) => {
  return (
    <>
        <label>{label}</label>
        <div className = "input-number-container">
            <input type="number" value={value} readOnly/>
            <button type="button" onClick={() => setFunction(prev => Math.max(minValue, prev - 1))} disabled={value === minValue}>-</button>
            <button type="button" onClick={() => setFunction(prev => prev + 1)}>+</button>
        </div>
    </>
  );
}