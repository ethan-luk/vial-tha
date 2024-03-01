import { Button, Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import FilterAccordion from "./FilterAccordion";
import { SlClose } from "react-icons/sl";


interface FilterProps {
    updateFilters: (filters: {gender: string, showActiveOnly: boolean, startDate: Date, endDate: Date}) => void;
    initialFilters: { gender: string, showActiveOnly: boolean, startDate: Date, endDate: Date }
}

const FilterButton: React.FC<FilterProps> = ({ updateFilters, initialFilters }) =>  {

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        updateFilters(filters)
    }, [filters])

    return (
        <Menu shadow="md" width={400} closeOnClickOutside={false}>
          <Menu.Target>
            <Button>Toggle menu</Button>
          </Menu.Target>
      
          <Menu.Dropdown>
            <Menu.Label>Filter By: </Menu.Label>
            <Menu.Item closeMenuOnClick={true}><SlClose /></Menu.Item>
            <Menu.Item component={FilterAccordion} updateFilters={setFilters} initialFilters={filters} />
          </Menu.Dropdown>
        </Menu>
      );
}

export default FilterButton