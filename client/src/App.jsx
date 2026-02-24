import { useState, useEffect, useRef } from 'react';
import './App.css'
import { Form } from './form-components/Form'
import { SearchResult } from './search-result-components/SearchResult';
import { MOCK_FLIGHTS } from './mockData.js'
import { scroller } from 'react-scroll';


function App() {
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const resultsRef = useRef(null);

  const handleSearchRequest = async (formData) => {
    setIsSearching(true);
    setTimeout(() => {
      setResults(MOCK_FLIGHTS);
      setIsSearching(false);
    }, 2000);
  }

  useEffect(() => {
    if (results && resultsRef.current) {
      scroller.scrollTo(resultsRef.current.id, {
        duration: 800,
        delay: 100,
        smooth: 'easeInOutQuart'
      });
    }
  }, [results]);

  return (
  <>
    <Form onSubmitData={handleSearchRequest} isSearching={isSearching} />
    <SearchResult refResult={resultsRef} result={results} />
  </>
  );  
}

export default App
