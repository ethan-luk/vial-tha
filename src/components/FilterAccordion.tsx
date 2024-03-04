import { Accordion, Checkbox, Group, RangeSlider, RangeSliderValue, SegmentedControl, Space, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { FilterOptions , FilterProps } from "../models/FilterOptions";

interface CalendarProps {
    updateCalendarOpened: (isOpen: boolean) => void;
}

const FilterAccordion: React.FC<FilterProps & CalendarProps> = React.forwardRef(({ updateFilters, currentFilters, updateCalendarOpened }, _ ) => {

    const [opened, setOpened] = useState<string[]>([]);

    const [calendarOpened, setCalendarOpened] = useState<boolean>(false)

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

    const [startDateError, setStartDateError] = useState<string | null>(null)
    const [endDateError, setEndDateError] = useState<string | null>(null)

    const [filters, setFilters] = useState<FilterOptions>(currentFilters);

    useEffect(() => {
        updateFilters(filters)
    }, [filters])

    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    useEffect(() => {
        updateCalendarOpened(calendarOpened)
    }, [calendarOpened])

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
        if (startDateToUse.getTime() > filters.endDate.getTime()) {
            setStartDateError("Start date can't come after end date!")
        }
        else {
            setFilters({
                ...filters,
                startDate: startDateToUse
            })
            setStartDate(newStartDate)
            setStartDateError(null)
        }
        setCalendarOpened(false)
    }

    const handleEndDateChange = (newEndDate: Date | null) => {
        const endDateToUse = newEndDate || new Date('9999-12-31T23:59:59.999Z');
        if (endDateToUse.getTime() < filters.startDate.getTime()) {
            setEndDateError("End date can't come before start date!")
        }
        else {
            setFilters({
                ...filters,
                endDate: endDateToUse
            })
            setEndDate(newEndDate)
            setEndDateError(null)

        }
        setCalendarOpened(false)
    }

    const genderFilter = (
        <Group justify="space-between" gap="xl" grow>
            <Checkbox onClick={() => handleFilterByGender('Female')}
                        color="orange"
                        variant='outline'
                        label='Female' 
                        checked={femaleFilterChecked} 
                        onChange={(event) => handleCheckmarkChange(event.currentTarget.checked, 'Female')}/>
            <Checkbox onClick={() => handleFilterByGender('Male')} 
                        label='Male' 
                        color="orange"
                        variant='outline'
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
            <Text size='sm' fw={500}>Range:</Text>
            <Space h='xs' />
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
                <Accordion.Control h={45}>
                    <Text>Gender</Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <Space h="xs" />
                        {genderFilter}
                    <Space h="xs" />
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={'Age'}>
                <Accordion.Control h={45}>
                    <Text>Age</Text>
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
                <Accordion.Control h={45}>
                <Text>Date</Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <DateInput
                        clearable
                        error={startDateError}
                        value={startDate}
                        onChange={handleStartDateChange}
                        label="From"
                        placeholder="Start Date"
                        onClick={() => setCalendarOpened(true)}
                    />
                    <Space h="md" />
                    <DateInput
                        clearable
                        error={endDateError}
                        value={endDate}
                        onChange={handleEndDateChange}
                        label="To"
                        placeholder="End Date"
                        onClick={() => setCalendarOpened(true)}
                    />
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
});

export default FilterAccordion