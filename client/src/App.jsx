import { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import { Form } from './form-components/Form';
import { SearchResult } from './search-result-components/SearchResult';
import { MOCK_FLIGHTS } from './mockData.js';
import { scroller } from 'react-scroll';
import { AppHeader } from './header-components/AppHeader.jsx';


function App() {
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedDestination, setSearchedDestination] = useState("");
  const [StartingPointsCount, setStartingPointsCount] = useState(2);

  const resultsRef = useRef(null);

  const handleSearchRequest = async (formData) => {
    setIsSearching(true);
    setTimeout(() => {
      setSearchedDestination('Paris');
      setStartingPointsCount(3);
      setResults(MOCK_FLIGHTS);
      setIsSearching(false);
    }, 3000);
  }

  useEffect(() => {
    if (results && resultsRef.current) {
      scroller.scrollTo(resultsRef.current.id, {
        duration: 800,
        delay: 100,
        smooth: 'easeInOutQuart',
        ignoreCancelEvents: true
      });
    }
  }, [results]);

  return (
  <div className="App">
    <AppHeader />
    <Form onSubmitData={handleSearchRequest} isSearching={isSearching} />
    <SearchResult refResult={resultsRef} result={results} destination={searchedDestination} StartingPointsCount={StartingPointsCount}/>
  </div>
  );  
}

export default App
