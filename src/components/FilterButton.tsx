import { Button, Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import FilterAccordion from "./FilterAccordion";

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
        <Menu shadow="md" width={400}>
          <Menu.Target>
            <Button>Toggle menu</Button>
          </Menu.Target>
      
          <Menu.Dropdown>
            <Menu.Label>Filter By:</Menu.Label>

            <Menu.Item component={FilterAccordion} updateFilters={setFilters} initialFilters={filters} />

            <Menu.Divider />
      
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item>
              Transfer my data
            </Menu.Item>
            <Menu.Item color="red">
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
}

export default FilterButton