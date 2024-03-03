import { Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import FilterAccordion from "./FilterAccordion";
import { SlClose } from "react-icons/sl";
import { FilterProps } from "../models/FilterOptions";
import FilterButton from "./FilterButton";

const FilterMap: React.FC<FilterProps> = ({ updateFilters, currentFilters }) =>  {

    const [filters, setFilters] = useState(currentFilters);

    useEffect(() => {
        updateFilters(filters)
    }, [filters])

    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    return (
        <Menu shadow="md" width={400} closeOnClickOutside={false} position='bottom-start'>
          <Menu.Target>
            <FilterButton />
          </Menu.Target>
      
          <Menu.Dropdown>
            <Menu.Label>Filter By:</Menu.Label>
            <Menu.Item closeMenuOnClick={true}><SlClose /></Menu.Item>
            <Menu.Item component={FilterAccordion} updateFilters={setFilters} currentFilters={filters} />
          </Menu.Dropdown>
        </Menu>
    );
}

export default FilterMap