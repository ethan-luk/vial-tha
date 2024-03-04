import { Button } from "@mantine/core";
import { forwardRef } from "react";
import { LuFilter } from "react-icons/lu";

import "../styles.css";

const FilterButton = forwardRef<
  HTMLButtonElement,
  { numActiveFilters: number }
>(({ numActiveFilters, ...others }, ref) => {
  const button = (
    <Button
      ref={ref}
      w={numActiveFilters != 0 ? "144px" : "109px"}
      h={40}
      justify="space-between"
      variant={numActiveFilters != 0 ? "filled" : "outline"}
      color="orange"
      radius="md"
      leftSection={<LuFilter size={14} />}
      rightSection={
        numActiveFilters != 0 && (
          <div className={`circle`}>{numActiveFilters}</div>
        )
      }
      {...others}
    >
      Filters
    </Button>
  );
  return button;
});

export default FilterButton;
