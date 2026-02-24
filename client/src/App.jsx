import './App.css'
import { Form } from './form-components/Form'
import { SearchResult } from './search-result-components/SearchResult';
import {MOCK_FLIGHTS} from './mockData.js'

function App() {
  return (
  <>
    <Form />
    <SearchResult result={MOCK_FLIGHTS} />
  </>
  );  
}

export default App
