import React, { useEffect, useState } from "react";
import { Radio } from "@mantine/core";

interface SortRadioProps {
  updateSortOption: (sortOption: string) => void;
  currentSort: string;
  activeSort: boolean;
}

const SortRadios: React.FC<SortRadioProps> = React.forwardRef(
  ({ updateSortOption, currentSort, activeSort }, _) => {
    const [sortOption, setSortOption] = useState<string>(
      activeSort ? currentSort : ""
    );

    useEffect(() => {
      updateSortOption(sortOption);
    }, [sortOption]);

    return (
      <Radio.Group value={sortOption} onChange={setSortOption} ps="md" pt="sm">
        <Radio color="orange" pt="sm" value="Name" label="Name" />
        <Radio color="orange" pt="sm" value="Age" label="Age" />
        <Radio
          color="orange"
          pt="sm"
          value="Diagnosis Date"
          label="Diagnosis Date"
        />
      </Radio.Group>
    );
  }
);

export default SortRadios;
