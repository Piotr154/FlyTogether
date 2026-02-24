import '../Form.css'
import { useEffect, useState } from 'react'
import { DateField } from './DateField'
import { NumberField } from './NumberField'
import { SelectField } from './SelectField'

const today = new Date();
today.setHours(0, 0, 0, 0);
const cities = ["BER", "STN", "Paris", "City:dubrovnik_hr", "Madrid", "Rome", "Amsterdam", "Prague", "Vienna", "WMI", "Budapest", "Dublin", "Copenhagen", "Stockholm", "Oslo", "Helsinki", "Lisbon", "Brussels", "Athens", "Zagreb", "Belgrade", "New York"];
const randomCity = () => {
  return cities[Math.floor(Math.random() * cities.length)];
}
const options = cities.map(city => ({ value: city, label: city }))

const adjustDateByDays = (dateString, days) => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

const normalizeDate = (dateInput) => {
  if (!dateInput) return null;

  if (typeof dateInput === 'string') {
    const [year, month, day] = dateInput.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  }

  const copy = new Date(dateInput);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export const Form = () => {
  const [groupSize, setGroupSize] = useState(1);
  const [origin, setOrigin] = useState(new Array(groupSize).fill(""));
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dateMargin, setDateMargin] = useState(0);
  const [placeholderOrigin, setPlaceholderOrigin] = useState(() => Array.from({ length: groupSize }, () => randomCity()));
  const [placeholderDestination, setPlaceholderDestination] = useState(randomCity());


  useEffect(() => {
    setOrigin(prevOrigin => {
      let newOrigin = [];
      for (let i = 0; i < groupSize; i++) {
        newOrigin.push(prevOrigin[i] || "");
      }
      return newOrigin;
    })

    setPlaceholderOrigin(prevPlaceholderOrigin => {
      let newPlaceholderOrigin = [];
      for (let i = 0; i < groupSize; i++) {
        newPlaceholderOrigin.push(prevPlaceholderOrigin[i] || randomCity());
      }
      return newPlaceholderOrigin;
    })
  }, [groupSize]);


  const handleOriginChange = (selectedOption, index) => {
    setOrigin(prevOrigin => {
      const newOrigin = [...prevOrigin];
      newOrigin[index] = selectedOption ? selectedOption.value : "";
      return newOrigin;
    })
  }
  const handleDestinationChange = (selectedOption) => {
    setDestination(selectedOption ? selectedOption.value : "");
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
    const margin = parseInt(dateMargin, 10) || 0;

    const payload = {
      from: origin.join(','),               // String: "Berlin,Paris"]
      to: destination,     // String: "New York"
      outboundDateStart: adjustDateByDays(departureDate, -margin), // String: "2024-12-01"
      outboundDateEnd: adjustDateByDays(departureDate, margin),
      inboundDateStart: adjustDateByDays(returnDate, -margin),       // String: "2024-12-15"
      inboundDateEnd: adjustDateByDays(returnDate, margin),
    };
    console.log("Sending data:", payload);

    try {
      const queryString = new URLSearchParams(payload).toString();
      const response = await fetch(`http://localhost:3000/api/flights/search?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received flights:", data);
      alert(`Found ${data.data.length || 0} flight options.`);

      clearForm();

    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to retrieve flights. Please try again later.");
    }
  }
  const canSearch = !(
    origin.some(city => city.length === 0) ||
    destination.length === 0 ||
    departureDate === "" ||
    returnDate === "" ||
    normalizeDate(departureDate) > normalizeDate(returnDate) ||
    normalizeDate(today) > normalizeDate(departureDate) ||
    isNaN(dateMargin)
  );

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <h2>FlyTogether</h2>
        <NumberField
          label="Group size"
          value={groupSize}
          minValue={1}
          maxValue={10}
          setFunction={setGroupSize}
          canBeTyped={false}
        />
        {(groupSize === 1 ?
          <SelectField
            key={0}
            id={'user'}
            label={'Starting point'}
            placeholder={placeholderOrigin[0]}
            value={origin[0]}
            options={options}
            onChange={(val) => handleOriginChange(val, 0)}
          />
          : origin.map((singleOrigin, index) =>
            <SelectField
              key={index}
              id={`starting-point-${index}`}
              label={`Starting point ${index + 1}`}
              placeholder={placeholderOrigin[index]}
              value={singleOrigin}
              options={options}
              onChange={(val) => handleOriginChange(val, index)}
            />
          ))}
        <SelectField
          id="destination"
          label="Destination"
          placeholder={placeholderDestination}
          value={destination}
          options={options}
          onChange={handleDestinationChange}
        />
        <div>
          <DateField
            id="departure-date"
            label="Departure date"
            value={departureDate}
            onChange={handleDepartureDateChange}
            departureDate={normalizeDate(departureDate)}
            today={normalizeDate(today)}
          />
        </div>
        <DateField
          id="return-date"
          label="Return date"
          value={returnDate}
          onChange={handleReturnDateChange}
          departureDate={normalizeDate(departureDate)}
          returnDate={normalizeDate(returnDate)}
        />
        <NumberField
          label="Date margin (+/- days)"
          value={dateMargin}
          minValue={0}
          maxValue={90}
          canBeTyped={true}
          setFunction={setDateMargin}
        />
        <div className="row">
          <button type="button" onClick={clearForm}>
            Clear
          </button>
          <button type="submit" disabled={!canSearch}>
            Search
          </button>
        </div>
      </fieldset>
    </form>
  )
}
