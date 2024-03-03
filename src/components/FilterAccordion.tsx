import { Accordion, Checkbox, Group, RangeSlider, RangeSliderValue, SegmentedControl, Space, Stack, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { FilterOptions , FilterProps } from "../models/FilterOptions";


const FilterAccordion: React.FC<FilterProps> = React.forwardRef(({ updateFilters, currentFilters }, _ ) => {

    const [opened, setOpened] = useState<string[]>([]);

    const [femaleFilterChecked, setFemaleFilterChecked] = useState<boolean>(currentFilters.gender === 'Female');
    const [maleFilterChecked, setMaleFilterChecked] = useState<boolean>(currentFilters.gender === 'Male');

    const [ageControl, setAgeControl] = useState<string>('text')
    const [minAgeError, setMinAgeError] = useState<string | null>(null)
    const [maxAgeError, setMaxAgeError] = useState<string | null>(null)

    const [ageRange, setAgeRange] = useState<[number, number]>(currentFilters.ageRange)
    const [minAgeValue, setMinAgeValue] = useState<string>(ageRange[0].toString())
    const [maxAgeValue, setMaxAgeValue] = useState<string>(ageRange[1].toString())

    const [startDate, setStartDate] = useState<Date | null>(currentFilters.startDate.getTime() == new Date('0000-01-01T00:00:00.000Z').getTime() ? null : currentFilters.startDate);
    const [endDate, setEndDate] = useState<Date | null>(currentFilters.endDate.getTime() == new Date('9999-12-31T23:59:59.999Z').getTime() ? null : currentFilters.endDate);

    const [filters, setFilters] = useState<FilterOptions>(currentFilters);

    useEffect(() => {
        updateFilters(filters)
    }, [filters])

    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    const changeMinAgeFromText = (newAge: string) => {
        const intAge = parseInt(newAge, 10);

        if (isNaN(intAge)) {
            setMinAgeError("Oops! Please enter a number")
        }
        else if (intAge > ageRange[1]) {
            setMinAgeError("Can't be greater than max age!")
        }
        else if (intAge < 0) {
            setMinAgeError("Can't be less than zero!")
        }
        else {
            setMinAgeError(null)
            setMinAgeValue(newAge)
            setFilters({
                ...filters,
                ageRange: [intAge, ageRange[1]]
            })
            setAgeRange([intAge, ageRange[1]])
        }
    }

    const changeMaxAgeFromText = (newAge: string) => {
        const intAge = parseInt(newAge, 10);

        if (isNaN(intAge)) {
            setMaxAgeError("Oops! Please enter a number")
        }
        else if (intAge < ageRange[0]) {
            setMaxAgeError("Can't be greater than max age!")
        }
        else if (intAge > 120) {
            setMaxAgeError("Too old for me!")
        }
        else {
            setMaxAgeError(null)
            setMaxAgeValue(newAge)
            setFilters({
                ...filters,
                ageRange: [ageRange[0], intAge]
            })
            setAgeRange([ageRange[0], intAge])
        }
    }

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
        setMinAgeValue(newAgeRange[0].toString())
        setMaxAgeValue(newAgeRange[1].toString())

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

    const genderFilter = (
        <Group justify="space-between" gap="xl" grow>
            <Checkbox onClick={() => handleFilterByGender('Female')} 
                        label='Female' 
                        checked={femaleFilterChecked} 
                        onChange={(event) => handleCheckmarkChange(event.currentTarget.checked, 'Female')}/>
            <Checkbox onClick={() => handleFilterByGender('Male')} 
                        label='Male' 
                        checked={maleFilterChecked} 
                        onChange={(event) => handleCheckmarkChange(event.currentTarget.checked, 'Male')}/>
        </Group>
    )

    const textAgeControl = (
            <Group>
                <TextInput
                    mb={maxAgeError ? 'md' : ''}
                    error={minAgeError}
                    label="Minimum Age:"
                    placeholder={ageRange[0].toString()}
                    size='xs'
                    value={minAgeValue}
                    onChange={(event) => setMinAgeValue(event.currentTarget.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') changeMinAgeFromText(event.currentTarget.value)
                    }}
                />
                <TextInput
                    mb={minAgeError ? 'md' : ''}
                    error={maxAgeError}
                    label="Maximum Age:"
                    placeholder={ageRange[1].toString()}
                    size='xs'
                    value={maxAgeValue}
                    onChange={(event) => setMaxAgeValue(event.currentTarget.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') changeMaxAgeFromText(event.currentTarget.value)
                    }}
            />
            </Group>
        )

    const sliderAgeControl = (
        <>
            <Text>Range:</Text>
            <RangeSlider minRange={1}
                min={0}
                max={120}
                step={1}
                value={ageRange}
                onChange={setAgeRange}
                onChangeEnd={handleAgeRangeChange}
                marks={[
                    { value: 0, label: '0' },
                    { value: 30, label: '30' },
                    { value: 60, label: '60' },
                    { value: 90, label: '90' },
                    { value: 120, label: '120' },
                ]} 
            />
        </>
    )

    const controlInfo = (
        <SegmentedControl
            fullWidth
            radius='xl'
            color='orange'
            value={ageControl}
            onChange={setAgeControl}
            data={[
                { label: 'Text', value: 'text' },
                { label: 'Slider', value: 'slider' },
            ]}
        />
    )

    return (
        <Accordion multiple value={opened} onChange={setOpened}>
            <Accordion.Item value={'Gender'}>
                <Accordion.Control>
                    Gender
                </Accordion.Control>
                <Accordion.Panel>
                    <Space h="xs" />
                        {genderFilter}
                    <Space h="xs" />
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={'Age'}>
                <Accordion.Control>
                    Age
                </Accordion.Control>
                <Accordion.Panel>    
                    <Space h='xs' />
                        {controlInfo}
                    <Space h='md' />
                        {ageControl == 'text' ? textAgeControl : sliderAgeControl}
                    <Space h='md' />

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
                        label="From"
                        placeholder="Start Date"
                    />
                    <Space h="md" />
                    <DateInput
                        clearable
                        value={endDate}
                        onChange={handleEndDateChange}
                        label="To"
                        placeholder="End Date"
                    />
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
});

export default FilterAccordion