import { Select } from '@mantine/core';

export const SortBy = ({data, SortFlightsBy, setSortFlightsBy}) => {
    return(
        <Select 
            className="sortBy"
            label= "Sort By"
            placeholder="Pick value"
            data={data}
            defaultValue={data[0]}
            value={SortFlightsBy}
            onChange={setSortFlightsBy}
            classNames={{
                option: 'sort-by-option' 
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
                            color: "var( --app-text-primary)",
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