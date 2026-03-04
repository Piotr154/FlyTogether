import { Select } from '@mantine/core';
import '../styles/ResultsFilter.css';

export const ResultsFilter = () => {
    return(
        <Select 
            className="ResultsFilter"
            label="Your favorite library"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
        />
    );
}