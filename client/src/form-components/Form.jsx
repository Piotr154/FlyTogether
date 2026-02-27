import '../styles/Form.css'
import { useEffect, useState } from 'react'
import { DateField } from './DateField'
import { SelectField } from './SelectField'
import { GroupSizeButton } from './GroupSizeButton'
import { IconPlaneTilt } from '@tabler/icons-react';

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

export const Form = ({ onSubmitData, isSearching }) => {
  const [groupSize, setGroupSize] = useState(2);
  const [origin, setOrigin] = useState(new Array(groupSize).fill(""));
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
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

  const clearForm = () => {
    setOrigin(new Array(origin.length).fill(""));
    setDestination("");
    setDepartureDate(null);
    setReturnDate(null);
    setDateMargin(0);
  }

  /*
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
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      origin: origin,
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      dateMargin: dateMargin
    };
    onSubmitData(payload); 
    clearForm();
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
    <form className="search-form" onSubmit={handleSubmit}>
      <fieldset className="search-form__fieldset">
        
        {/* Sekcja Starting Points */}
        <div>
          <div className="search-form__header-row">
            <label className="search-form__label">Starting points</label>
            <div className="search-form__counter-buttons">
              <GroupSizeButton
                value={groupSize}
                maxValue={8}
                minValue={1}
                setFunction={setGroupSize}
                content="-"
              />
              <GroupSizeButton
                value={groupSize}
                maxValue={8}
                minValue={1}
                setFunction={setGroupSize}
                content="+"
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {groupSize === 1 ? (
              <SelectField
                key={0}
                id={'user'}
                placeholder={placeholderOrigin[0]}
                value={origin[0]}
                options={options}
                onChange={(val) => handleOriginChange(val, 0)}
              />
            ) : (
              origin.map((singleOrigin, index) => (
                <SelectField
                  key={index}
                  id={`starting-point-${index}`}
                  placeholder={placeholderOrigin[index]}
                  value={singleOrigin}
                  options={options}
                  onChange={(val) => handleOriginChange(val, index)}
                />
              ))
            )}
          </div>
        </div>

        {/* Sekcja Destination */}
        <div>
          <label className="search-form__label">Destination</label>
          <SelectField
            id="destination"
            placeholder={placeholderDestination}
            value={destination}
            options={options}
            onChange={handleDestinationChange}
          />
        </div>

        {/* Sekcja Travel Dates */}
        <div>
           <label className="search-form__label">Travel dates</label>
           <div style={{ display: 'flex', gap: '12px' }}>
              <DateField
                id="departure-date"
                label="Departure"
                value={departureDate}
                onChange={setDepartureDate}
                departureDate={normalizeDate(departureDate)}
                today={normalizeDate(today)}
              />
              <DateField
                id="return-date"
                label="Return"
                value={returnDate}
                onChange={setReturnDate}
                departureDate={normalizeDate(departureDate)}
                returnDate={normalizeDate(returnDate)}
                today={normalizeDate(today)}
              />
           </div>
        </div>

        <div className="search-form__actions">
          <button 
            type="submit" 
            className="search-form__submit-button" 
            disabled={!canSearch || isSearching}
          >
            <div className="search-layout">
              <IconPlaneTilt className="search-form__submit-icon" />
              {isSearching ? 'Searching...' : 'Search'}
            </div>
          </button>
        </div>

      </fieldset>
    </form>
  )
}