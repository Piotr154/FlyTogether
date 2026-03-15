import { MultiSelect } from '@mantine/core';

export const Filter = ({data, startingPointFilter, setStartingPointFilter}) => {
    
    return(
        <MultiSelect 
            className="filter"
            label= "Filter"
            placeholder="Pick value"
            data={data}
            value={startingPointFilter}
            onChange={setStartingPointFilter}
            classNames={{
                option: 'filter-option' 
            }}
            hidePickedOptions
            styles  = {{
                        label:{
                            marginTop: "10px",
                            marginLeft: "3px"
                        },
                        input:{
                            borderRadius: "8px",
                            border: "1px solid var(--app-border-color)",
                            backgroundColor: "var( --app-bg-card)",
                            color: "var( --app-text-primary)",
                        },
                        placeholder:{
                            margin: "0",
                            padding: "0"
                        },
                        dropdown: {
                            backgroundColor: "var( --app-bg-card)",
                            border: "1px solid var(--app-border-color)",
                            color: "var( --app-text-primary)"
                        },
                        inputField:{
                            display: startingPointFilter.length===0? "block" : "none"
                        },
                        pill:{
                            margin: "0",
                            backgroundColor: "var(--app-bg-body)",
                            color: "var(--app-text-primary)"
                        }
                        
                        
                    }}
        />
    );
}