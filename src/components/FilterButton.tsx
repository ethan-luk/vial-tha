import { UnstyledButton } from "@mantine/core"
import { forwardRef } from "react"

const FilterButton  = forwardRef<HTMLButtonElement, {}>(({ ...others }, ref) => {
    
    return (
      <UnstyledButton
        ref={ref}
        {...others}
      >
        Filters
      </UnstyledButton>
    )
});


export default FilterButton;