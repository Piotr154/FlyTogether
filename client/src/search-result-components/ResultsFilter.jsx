import { Select } from '@mantine/core';
import '../styles/ResultsFilter.css';

export const ResultsFilter = ({label, data}) => {
    return(
        <Select 
            className="ResultsFilter"
            label={label}
            placeholder="Pick value"
            data={data}
            classNames={{
                option: 'results-filter-option' 
            }}
            styles  = {{
                        label:{
                            marginTop: "10px",
                            marginLeft: "3px"
                        },
                        input:{
                            borderRadius: "8px",
                            border: "1px solid var(--app-border-color)",
                            backgroundColor: "var( --app-bg-card)",
                            color: "var( --app-text-primary)"
                        },
                        dropdown: {
                            backgroundColor: "var( --app-bg-card)",
                            border: "1px solid var(--app-border-color)",
                            color: "var( --app-text-primary)"
                        }
                    }}
        />
    );
}