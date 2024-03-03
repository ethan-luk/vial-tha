import { useEffect, useState } from "react";
import { FilterProps } from "../models/FilterOptions"
import { Button } from "@mantine/core";

const ActiveFilterElements: React.FC<FilterProps> = ({ updateFilters, currentFilters }) =>  {

    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }[]>([]);

    useEffect(() => {
        const activeFiltersArray = [];

        if (currentFilters.gender !== '') {
            activeFiltersArray.push({ 'Gender': currentFilters.gender })
        }

        if (currentFilters.ageRange[0] != 0) {
            activeFiltersArray.push({ 'Min Age': currentFilters.ageRange[0].toString() })
        }

        if (currentFilters.ageRange[1] != 120) {
            activeFiltersArray.push({ 'Max Age': currentFilters.ageRange[1].toString() })
        }

        if (currentFilters.startDate.getTime() != new Date('0000-01-01T00:00:00.000Z').getTime()) {
            activeFiltersArray.push({ 'Start Date': currentFilters.startDate.toDateString() })
        }

        if (currentFilters.endDate.getTime() != new Date('9999-12-31T23:59:59.999Z').getTime()) {
            activeFiltersArray.push({ 'End Date': currentFilters.endDate.toDateString() })
        }

        setActiveFilters(activeFiltersArray);
    }, [currentFilters])

    const handleFilterRemoval = (element: { [key: string]: string }) => {
        const key = Object.keys(element)[0];
        console.log(key);
    
        const filterMappings: { [key: string]: () => void } = {
            'Gender': () => updateFilters({ ...currentFilters, gender: '' }),
            'Min Age': () => updateFilters({ ...currentFilters, ageRange: [0, currentFilters.ageRange[1]] }),
            'Max Age': () => updateFilters({ ...currentFilters, ageRange: [currentFilters.ageRange[0], 120] }),
            'Start Date': () => updateFilters({ ...currentFilters, startDate: new Date('0000-01-01T00:00:00.000Z') }),
            'End Date': () => updateFilters({ ...currentFilters, endDate: new Date('9999-12-31T23:59:59.999Z') }),
        };
    
        if (filterMappings[key]) { 
            filterMappings[key]();
        }
    };

    const elements = activeFilters.map((element, index) => (
        <Button key={index} onClick={() => handleFilterRemoval(element)}>
          {Object.entries(element).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
        </Button>
    ));

    return (
        <>
            {elements}
        </>
    )
}

export default ActiveFilterElements