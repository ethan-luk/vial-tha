import { Accordion, Checkbox, RangeSlider, RangeSliderValue } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { FilterOptions , FilterProps } from "../models/FilterOptions";


const FilterAccordion: React.FC<FilterProps> = React.forwardRef(({ updateFilters, currentFilters }, _ ) => {

    const [value, setValue] = useState<string[]>([]);

    const [femaleFilterChecked, setFemaleFilterChecked] = useState<boolean>(currentFilters.gender === 'Female');
    const [maleFilterChecked, setMaleFilterChecked] = useState<boolean>(currentFilters.gender === 'Male');
    
    const [ageRange, setAgeRange] = useState<[number, number]>(currentFilters.ageRange)
    const [startDate, setStartDate] = useState<Date | null>(currentFilters.startDate.getTime() == new Date('0000-01-01T00:00:00.000Z').getTime() ? null : currentFilters.startDate);
    const [endDate, setEndDate] = useState<Date | null>(currentFilters.endDate.getTime() == new Date('9999-12-31T23:59:59.999Z').getTime() ? null : currentFilters.endDate);

    const [filters, setFilters] = useState<FilterOptions>(currentFilters);

    useEffect(() => {
        updateFilters(filters)
    }, [filters])

    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    const handleFilterByGender = (gender: string) => {
        setFilters((prevFilters) => {
            const newGenderFilter = prevFilters.gender === gender ? '' : gender;

            return {
            ...prevFilters,
            gender: newGenderFilter,
            };
        });
    };
    
    const handleCheckmarkChange = (check: boolean, gender: string) => {
        if (gender == 'Female') {
            setFemaleFilterChecked(check)
            setMaleFilterChecked(false)
        } else {
            setMaleFilterChecked(check)
            setFemaleFilterChecked(false)
        }
    }

    const handleAgeRangeChange = (newAgeRange: RangeSliderValue) => {
        setFilters({
            ...filters,
            ageRange: newAgeRange
        })
        setAgeRange(newAgeRange)
    }

    const handleStartDateChange = (newStartDate: Date | null) => {
        const startDateToUse = newStartDate || new Date('0000-01-01T00:00:00.000Z');
        setFilters({
          ...filters,
          startDate: startDateToUse
        })
        setStartDate(newStartDate)
    }

    const handleEndDateChange = (newEndDate: Date | null) => {
        const endDateToUse = newEndDate || new Date('9999-12-31T23:59:59.999Z');
        setFilters({
          ...filters,
          endDate: endDateToUse
        })

        setEndDate(newEndDate)
    }

    return (
        <Accordion multiple value={value} onChange={setValue}>
            <Accordion.Item value={'Gender'}>
                <Accordion.Control>
                    Gender
                </Accordion.Control>
                <Accordion.Panel>
                    <Checkbox onClick={() => handleFilterByGender('Female')} 
                                label='Female' 
                                checked={femaleFilterChecked} 
                                onChange={(event) => handleCheckmarkChange(event.currentTarget.checked, 'Female')}/>
                    <Checkbox onClick={() => handleFilterByGender('Male')} 
                                label='Male' 
                                checked={maleFilterChecked} 
                                onChange={(event) => handleCheckmarkChange(event.currentTarget.checked, 'Male')}/>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={'Age'}>
                <Accordion.Control>
                    Age
                </Accordion.Control>
                <Accordion.Panel>
                    <RangeSlider minRange={2} min={0} max={120} step={1} value={ageRange} onChange={setAgeRange} onChangeEnd={handleAgeRangeChange}/>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={'StartDate'}>
                <Accordion.Control>
                    Date
                </Accordion.Control>
                <Accordion.Panel>
                    <DateInput
                        clearable
                        value={startDate}
                        onChange={handleStartDateChange}
                        label="Start Date"
                        placeholder="Start Date"
                    />
                    <DateInput
                        clearable
                        value={endDate}
                        onChange={handleEndDateChange}
                        label="End Date"
                        placeholder="End Date"
                    />
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
});

export default FilterAccordion