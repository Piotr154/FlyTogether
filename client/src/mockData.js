// src/mockData.js
export const MOCK_FLIGHTS = [
  // --- WYLOTY (type: true) ---
  {
    id: "fly_1",
    type: true, 
    origin: "Berlin",
    destination: "Paris",
    departureTime: "2024-06-15T10:00:00",
    arrivalTime: "2024-06-15T14:00:00",
    price: 450,
    duration: 540,
    airline: "Lufthansa",
    deep_link: "https://www.lufthansa.com"
  },
  {
    id: "fly_2",
    type: true,
    origin: "Berlin",
    destination: "Paris",
    departureTime: "2024-06-15T12:30:00",
    arrivalTime: "2024-06-15T16:45:00",
    price: 380,
    duration: 600,
    airline: "Air France",
    deep_link: "https://www.airfrance.com"
  },
  {
    id: "fly_3",
    type: true,
    origin: "Warsaw",
    destination: "Paris",
    departureTime: "2024-06-15T09:15:00",
    arrivalTime: "2024-06-15T13:20:00",
    price: 520,
    duration: 580,
    airline: "LOT",
    deep_link: "https://www.lot.com"
  },
  {
    id: "fly_4",
    type: true,
    origin: "Madrid",
    destination: "Paris",
    departureTime: "2024-06-16T08:00:00",
    arrivalTime: "2024-06-16T12:00:00",
    price: 410,
    duration: 560,
    airline: "Iberia",
    deep_link: "https://www.iberia.com"
  },

  // --- POWROTY (type: false) ---

  {
    id: "fly_5_return",
    type: false, 
    origin: "Berlin", 
    destination: "Paris", 
    departureTime: "2024-06-20T15:00:00",
    arrivalTime: "2024-06-20T19:00:00",
    price: 420,
    duration: 540,
    airline: "Lufthansa",
    deep_link: "https://www.lufthansa.com"
  },
  {
    id: "fly_6_return",
    type: false,
    origin: "Warsaw",
    destination: "Paris",
    departureTime: "2024-06-21T10:00:00",
    arrivalTime: "2024-06-21T14:10:00",
    price: 500,
    duration: 580,
    airline: "LOT",
    deep_link: "https://www.lot.com"
  }
];