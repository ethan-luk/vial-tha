import { useEffect, useState } from "react";
import SortButton from "./SortButton";
import SortRadios from "./SortRadios";
import SortType from "./SortType";
import SubjectInfo from "../models/SubjectInfo";
import { Menu, Space, Text } from "@mantine/core";

interface GridSortButtonProps {
  updateSort: (
    sortedSubjects: SubjectInfo[],
    activeSort: { [key: string]: string }
  ) => void;
  originalSubjects: SubjectInfo[]
  activeSort: boolean;
  subjects: SubjectInfo[];
}

const GridSortMap: React.FC<GridSortButtonProps> = ({
  updateSort,
  originalSubjects,
  activeSort,
  subjects,
}) => {
  const [sortOption, setSortOption] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);

  useEffect(() => {
    const sortedData = [...subjects];
    const sortType = sortAsc ? "Ascending" : "Descending";

    if (sortAsc != undefined) {
      // Sort by name
      if (sortOption === "Name") {
        sortedData.sort((a, b) => {
          if (sortAsc) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      }

      // Sort by diagnosis date
      else if (sortOption === "Diagnosis Date") {
        sortedData.sort((a, b) => {
          if (sortAsc) {
            return a.diagnosisDate.localeCompare(b.diagnosisDate);
          } else {
            return b.diagnosisDate.localeCompare(a.diagnosisDate);
          }
        });
      }

      // Sort by age
      else if (sortOption === "Age") {
        sortedData.sort((a, b) => {
          if (sortAsc) {
            return a.age - b.age;
          } else {
            return b.age - a.age;
          }
        });
      }

      updateSort(sortedData, { [sortOption]: sortType });
    }
  }, [sortOption, sortAsc]);

  useEffect(() => {
    if (!activeSort) {
      setSortAsc(null);
    }
  });

  const handleSortOption = (option: string) => {
    setSortOption(option);
  };

  const handleSortType = (ascending: boolean | null) => {
    setSortAsc(ascending);
  };
  
  const handleResetClick = () => {
    updateSort(originalSubjects, {})

  }

  return (
    <Menu shadow="md" width={375} position="right-start">
      <Menu.Target>
        <SortButton activeSort={activeSort} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Sort By:</Menu.Label>
        <Menu.Item
          component={SortRadios}
          updateSortOption={handleSortOption}
          currentSort={sortOption}
          activeSort={activeSort}
        />
        <Space h="xl" />
        <Menu.Item
          component={SortType}
          updateSortType={handleSortType}
          disable={sortOption == ""}
          currentType={sortAsc}
        />
        <Space h="xs" />
        <Menu.Item
          onClick={handleResetClick}
        >
          <Text size="sm" ta="center" fw={700}>Reset</Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item closeMenuOnClick h={40} ps="md">
          <Text size="sm" ta="center" fw={700} c="orange">Close</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default GridSortMap;
