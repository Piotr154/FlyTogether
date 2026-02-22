import { useState } from 'react'
import './App.css'
import { InputField } from './inputField'

function App() {
  const [groupSize, setGroupSize] = useState(1);
  const [origin, setOrigin] = useState([""]);
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleGroupSizeChange = (e) => {
    setGroupSize(e.target.value);

    setOrigin(prevOrigin => {
      let newOrigin = [];
      for (let i=0; i<e.target.value; i++){
        newOrigin.push(prevOrigin[i] || "");
      }
      return newOrigin;
    })
  }
  const handleOriginChange = (e, index) => {
      setOrigin(prevOrigin => {
        const newOrigin = [...prevOrigin];
        newOrigin[index] = e.target.value;
        return newOrigin;
      })
  }
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  } 
  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
  }
  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  }
  const clearForm = () => {
    for (let i=0; i<groupSize; i++){
      setOrigin(prevOrigin => {
        const newOrigin = [...prevOrigin];
        newOrigin[i] = "";
        return newOrigin;
      })
    }
    setDestination("");
    setDepartureDate("");
    setReturnDate("");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Search submitted!");
    clearForm();
  }

  return (
      <form onSubmit={handleSubmit}>
          <fieldset>
            <h2>FlyTogether</h2>
            <InputField 
              type="number"
              label="Group size" 
              placeholder="" 
              value = {groupSize}
              onChange = {handleGroupSizeChange} />
              {origin.map((singleOrigin, index) =>
              <InputField 
                key={index} 
                type="text"
                label={`Origin ${index + 1}`} 
                placeholder="Berlin" 
                value = {singleOrigin}
                onChange = {(e) => handleOriginChange(e, index)} />
              )}
            <InputField 
              type="text"
              label="Destination" 
              placeholder="New York" 
              value = {destination}
              onChange = {handleDestinationChange} />
            <InputField 
              type="date"
              label="Departure Date" 
              placeholder="Select a date" 
              value = {departureDate}
              onChange = {handleDepartureDateChange} />
            <InputField 
              type="date"
              label="Return Date" 
              placeholder="Select a date" 
              value = {returnDate}
              onChange = {handleReturnDateChange} />
              <button type = "submit">
                Search
              </button>
              <button type = "reset" onClick={clearForm}>
                Reset
              </button> 
          </fieldset>
      </form>
  )
}

export default App
