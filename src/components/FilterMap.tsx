import { useEffect, useState } from "react";
import { FilterProps } from "../models/FilterOptions";
import FilterAccordion from "./FilterAccordion";
import FilterButton from "./FilterButton";
import { Menu, Text } from "@mantine/core";

const FilterMap: React.FC<FilterProps> = ({
  updateFilters,
  currentFilters,
  activeFilters,
}) => {
  const [filters, setFilters] = useState(currentFilters);
  const [numActiveFilters, setNumActiveFilters] = useState<number>(
    activeFilters ? Object.keys(activeFilters).length : 0
  );

  const [calendarOpened, setCalendarOpened] = useState<boolean>(false);

  useEffect(() => {
    updateFilters(filters);
  }, [filters]);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    setNumActiveFilters(activeFilters ? Object.keys(activeFilters).length : 0);
  }, [activeFilters]);

  const handleCalendarOpened = (isOpen: boolean) => {
    setCalendarOpened(isOpen);
  };

  return (
    <Menu
      shadow="md"
      width={375}
      closeOnClickOutside={!calendarOpened}
      position="right-start"
    >
      <Menu.Target>
        <FilterButton numActiveFilters={numActiveFilters} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Filter By:</Menu.Label>
        <Menu.Item
          component={FilterAccordion}
          updateFilters={setFilters}
          currentFilters={filters}
          updateCalendarOpened={handleCalendarOpened}
        />
        <Menu.Item closeMenuOnClick h={45} ps="md">
          <Text size="sm" fw={700} ta="center" c="blue">Close</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default FilterMap;
