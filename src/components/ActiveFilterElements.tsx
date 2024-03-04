import { useEffect, useState } from "react";
import { FilterProps } from "../models/FilterOptions";
import { Chip, Group, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const ActiveFilterElements: React.FC<FilterProps> = ({
  updateFilters,
  updateActiveFilters,
  currentFilters,
}) => {
  const [activeFilters, setActiveFilters] = useState<
    { [key: string]: string }[]
  >([]);

  useEffect(() => {
    if (updateActiveFilters) {
      updateActiveFilters(activeFilters);
    }
  }, [activeFilters]);

  useEffect(() => {
    const activeFiltersArray = [];

    if (currentFilters.gender !== "") {
      activeFiltersArray.push({ Gender: currentFilters.gender });
    }

    if (currentFilters.ageRange[0] != 0) {
      activeFiltersArray.push({
        "Min Age": currentFilters.ageRange[0].toString(),
      });
    }

    if (currentFilters.ageRange[1] != 120) {
      activeFiltersArray.push({
        "Max Age": currentFilters.ageRange[1].toString(),
      });
    }

    if (
      currentFilters.startDate.getTime() !=
      new Date("0000-01-01T00:00:00.000Z").getTime()
    ) {
      activeFiltersArray.push({
        From: currentFilters.startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      });
    }

    if (
      currentFilters.endDate.getTime() !=
      new Date("9999-12-31T23:59:59.999Z").getTime()
    ) {
      activeFiltersArray.push({
        To: currentFilters.endDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      });
    }

    if (currentFilters.searchText != "") {
      activeFiltersArray.push({
        "Name Starts With": currentFilters.searchText,
      });
    }

    setActiveFilters(activeFiltersArray);
  }, [currentFilters]);

  const handleFilterRemoval = (element: { [key: string]: string }) => {
    const key = Object.keys(element)[0];

    const filterMappings: { [key: string]: () => void } = {
      Gender: () => updateFilters({ ...currentFilters, gender: "" }),
      "Min Age": () =>
        updateFilters({
          ...currentFilters,
          ageRange: [0, currentFilters.ageRange[1]],
        }),
      "Max Age": () =>
        updateFilters({
          ...currentFilters,
          ageRange: [currentFilters.ageRange[0], 120],
        }),
      From: () =>
        updateFilters({
          ...currentFilters,
          startDate: new Date("0000-01-01T00:00:00.000Z"),
        }),
      To: () =>
        updateFilters({
          ...currentFilters,
          endDate: new Date("9999-12-31T23:59:59.999Z"),
        }),
    };

    if (filterMappings[key]) {
      filterMappings[key]();
    }
  };

  const elements = activeFilters.map((element, index) => (
    <Chip
      key={index}
      icon={<IconX style={{ width: rem(16), height: rem(16) }} />}
      color="blue"
      variant="light"
      checked={true}
      onClick={() => handleFilterRemoval(element)}
    >
      {Object.entries(element).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
    </Chip>
  ));

  return (
    <>
      <Group gap="sm">{elements}</Group>
    </>
  );
};

export default ActiveFilterElements;
