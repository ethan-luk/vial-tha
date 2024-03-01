import { Accordion, Checkbox } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface FilterProps {
    updateFilters: (filters: { gender: string, showActiveOnly: boolean, startDate: Date, endDate: Date }) => void;
    initialFilters: { gender: string, showActiveOnly: boolean, startDate: Date, endDate: Date }
}

const GenderAccordion: React.FC<FilterProps> = React.forwardRef(({ updateFilters, initialFilters }, _ ) => {

    const [femaleFilterChecked, setFemaleFilterChecked] = useState(false);
    const [maleFilterChecked, setMaleFilterChecked] = useState(false);
    const [isActiveFilterChecked, setIsActiveFilterChecked] = useState(false);

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

    return (
        <Accordion>
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
                                label='Status' 
                                checked={isActiveFilterChecked} 
                                onChange={(event) => setIsActiveFilterChecked(event.currentTarget.checked)}/>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
});

export default GenderAccordion