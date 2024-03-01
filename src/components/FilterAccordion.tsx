import { Accordion, Checkbox } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";

interface FilterProps {
    updateFilters: (filters: { gender: string, showActiveOnly: boolean, startDate: Date, endDate: Date }) => void;
    initialFilters: { gender: string, showActiveOnly: boolean, startDate: Date, endDate: Date }
}

const FilterAccordion: React.FC<FilterProps> = React.forwardRef(({ updateFilters, initialFilters }, _ ) => {

    const [value, setValue] = useState<string[]>([]);

    const [femaleFilterChecked, setFemaleFilterChecked] = useState(initialFilters.gender === 'Female');
    const [maleFilterChecked, setMaleFilterChecked] = useState(initialFilters.gender === 'Male');
    const [isActiveFilterChecked, setIsActiveFilterChecked] = useState(initialFilters.showActiveOnly);
    const [startDate, setStartDate] = useState<Date | null>(initialFilters.startDate);
    const [endDate, setEndDate] = useState<Date | null>(initialFilters.endDate);

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        updateFilters(filters)
    }, [filters])

    const handleFilterByGender = (gender: string) => {
        setFilters((prevFilters) => {
            const newGenderFilter = prevFilters.gender === gender ? '' : gender;

            return {
            ...prevFilters,
            gender: newGenderFilter,
            };
        });
    };

    const handleIsActiveFilter = () => {
        setFilters({
          ...filters,
          showActiveOnly: !filters.showActiveOnly,
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

            <Accordion.Item value={'Status'}>
                <Accordion.Control>
                    Status
                </Accordion.Control>
                <Accordion.Panel>
                    <Checkbox onClick={() => handleIsActiveFilter()} 
                                label='Show Active Only' 
                                checked={isActiveFilterChecked} 
                                onChange={(event) => setIsActiveFilterChecked(event.currentTarget.checked)}/>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={'StartDate'}>
                <Accordion.Control>
                    Date
                </Accordion.Control>
                <Accordion.Panel>
                    <DateInput
                        value={startDate}
                        onChange={handleStartDateChange}
                        label="Start Date"
                        placeholder="Start Date"
                    />
                    <DateInput
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