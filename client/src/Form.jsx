import { useEffect, useState } from 'react'
import { InputField } from './inputField'
import { NumberField } from './numberField'

const cities = ["Berlin", "Paris", "Madrid", "Rome", "Amsterdam", "Prague", "Vienna", "Warsaw", "Budapest", "Dublin", "Copenhagen", "Stockholm", "Oslo", "Helsinki", "Lisbon", "Brussels", "Athens", "Zagreb", "Belgrade", "New York"];
const randomCity = () => {
    return cities[Math.floor(Math.random() * cities.length)];
  }

export const Form = () => {
  const [groupSize, setGroupSize] = useState(2);
  const [origin, setOrigin] = useState(new Array(groupSize).fill(""));
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dateMargin, setDateMargin] = useState(0);
  const [placeholderOrigin, setPlaceholderOrigin] = useState(()=> Array.from({length: groupSize}, () => randomCity()));
  const [placeholderDestination, setPlaceholderDestination] = useState(randomCity());
  
  
  useEffect(() => {
    setOrigin(prevOrigin => {
      let newOrigin = [];
      for (let i=0; i<groupSize; i++){
        newOrigin.push(prevOrigin[i] || "");
      }
      return newOrigin;
    })

    setPlaceholderOrigin(prevPlaceholderOrigin => {
      let newPlaceholderOrigin = [];
      for (let i=0; i<groupSize; i++){
        newPlaceholderOrigin.push(prevPlaceholderOrigin[i] || randomCity());
      }
      return newPlaceholderOrigin;
    })
    }, [groupSize]);


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
    setOrigin(new Array(origin.length).fill(""));
    setDestination("");
    setDepartureDate("");
    setReturnDate("");
    setDateMargin(0);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      origin: origin,               // Array: ["Berlin", "Paris"]
      destination: destination,     // String: "New York"
      departureDate: departureDate, // String: "2024-12-01"
      returnDate: returnDate,       // String: "2024-12-15"
      dateMargin: dateMargin        // Number: e.g. 2
    };
    console.log("Sending data:", payload);

    try {
      const response = await fetch('http://localhost:3000/api/flights/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received flights:", data);
      
      alert(`Found ${data.length || 0} flight options.`);

      clearForm(); 
      
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to retrieve flights. Please try again later.");
    }
  }
  const canSearch = !(
    origin.some(city => city.length < 2) || 
    destination.length < 2 || 
    departureDate === "" || 
    returnDate === "" || 
    new Date(departureDate) > new Date(returnDate) ||
    new Date() > new Date(departureDate)
  );

  return (
      <form onSubmit={handleSubmit}>
          <fieldset>
            <h2>FlyTogether</h2>
            <NumberField 
              label="Group size"
              value={groupSize}
              minValue={2}
              setFunction={setGroupSize}
            />
              {origin.map((singleOrigin, index) =>
                <InputField 
                  key={index} 
                  id={`friend-${index}`} 
                  type="text" 
                  label={`Friend ${index + 1}`} 
                  placeholder= {placeholderOrigin[index]} 
                  value = {singleOrigin}
                  onChange = {(e) => handleOriginChange(e, index)} 
                />
              )}
            <InputField 
              id="destination"
              type="text"
              label="Destination" 
              placeholder={placeholderDestination} 
              value = {destination}
              onChange = {handleDestinationChange} 
            />
            <InputField 
              id="departure-date"
              type="date"
              label="Departure date" 
              value = {departureDate}
              onChange = {handleDepartureDateChange} 
            />
            <InputField 
              id="return-date"
              type="date"
              label="Return date" 
              value = {returnDate}
              onChange = {handleReturnDateChange} 
            />
            <NumberField 
              label="Date margin (+/- days)"
              value={dateMargin}
              minValue = {0}
              setFunction={setDateMargin}
            />
            <div className="row">
              <button type = "submit" disabled={!canSearch}>
                Search
              </button>
              <button type = "button" onClick={clearForm}>
                Clear
              </button> 
            </div>
          </fieldset>
      </form>
  )
}
