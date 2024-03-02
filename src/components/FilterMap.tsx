import { Button, Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import FilterAccordion from "./FilterAccordion";
import { SlClose } from "react-icons/sl";
import FilterOptions from "../models/FilterOptions";


interface FilterProps {
    updateFilters: (filters: FilterOptions) => void;
    initialFilters: FilterOptions
}

const FilterMap: React.FC<FilterProps> = ({ updateFilters, initialFilters }) =>  {

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        updateFilters(filters)
    }, [filters])

    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    return (
        <Menu shadow="md" width={400} closeOnClickOutside={false} position='bottom-start'>
          <Menu.Target>
            <Button>Filters</Button>
          </Menu.Target>
      
          <Menu.Dropdown>
            <Menu.Label>Filter By:</Menu.Label>
            <Menu.Item closeMenuOnClick={true}><SlClose /></Menu.Item>
            <Menu.Item component={FilterAccordion} updateFilters={setFilters} initialFilters={filters} />
          </Menu.Dropdown>
        </Menu>
    );
}

export default FilterMap