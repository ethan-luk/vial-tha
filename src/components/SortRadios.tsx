import { Radio } from "@mantine/core";
import React from "react";
import { useEffect, useState } from "react";

interface SortRadioProps {
    updateSortOption: (sortOption: string) => void;
    currentSort: string
}

const SortRadios: React.FC<SortRadioProps> = React.forwardRef(({ updateSortOption, currentSort }, _ ) => {

    const [sortOption, setSortOption] = useState(currentSort);
    
    useEffect(() => {
        updateSortOption(sortOption)
    }, [sortOption])
    
    return (
        <Radio.Group
          value={sortOption}
          onChange={setSortOption}
          ps='md'
          pt='sm'
        >
          <Radio color='orange' pt='sm' value="Name" label="Name" />
          <Radio color='orange' pt='sm' value="Age" label="Age" />
          <Radio color='orange' pt='sm' value="Diagnosis Date" label="Diagnosis Date" />
        </Radio.Group>
      );
});

export default SortRadios