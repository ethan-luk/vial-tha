import { Button } from "@mantine/core"
import { forwardRef } from "react"
import { GoSortAsc } from "react-icons/go";

import '../styles.css'; // Import your CSS file


const sortButton = forwardRef<HTMLButtonElement, { activeSort: boolean }>(({ activeSort, ...others }, ref) => {
    return (
        <Button ref={ref}
                w={activeSort ? '120px' : '100px'}
                h={40}
                justify='flex-start'
                variant={activeSort ? 'filled' : 'outline'}
                color='orange'
                radius='md'
                leftSection={<GoSortAsc size={18} />} 
                rightSection={activeSort && <div className={`circle`}>1</div>}
                {...others}>
            Sort
        </Button>
    )
});


export default sortButton;