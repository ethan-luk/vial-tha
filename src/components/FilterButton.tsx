import { Button } from "@mantine/core"
import { forwardRef } from "react"
import { LuFilter } from "react-icons/lu";

import '../styles.css'; // Import your CSS file


const FilterButton  = forwardRef<HTMLButtonElement, { numActiveFilters: number }>(({ numActiveFilters, ...others }, ref) => {
    return (
        <Button ref={ref} 
                style={{ width: numActiveFilters === 0 ? '109px' : '144px', height:'40px' }} 
                justify='space-between'
                leftSection={<LuFilter size={14} />} 
                rightSection={numActiveFilters != 0 && <div className={`circle`}>{numActiveFilters}</div>}
                {...others}>
            Filters
        </Button>
    )
});


export default FilterButton;