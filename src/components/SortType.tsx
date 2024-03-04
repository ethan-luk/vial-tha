import { Button, Group } from "@mantine/core"
import React from "react"

interface SortTypeProps {
    updateSortType: (sortAsc: boolean | null) => void;
    disable: boolean
}

const SortType: React.FC<SortTypeProps> = React.forwardRef(({ updateSortType, disable }, _ ) => {

    return (
        <Group gap={2} pe='md' ps='md' justify="center" grow>
            <Button variant='outline' color='orange' disabled={disable} h={50} onClick={() => updateSortType(true)}>Ascending</Button>
            <Button variant='outline' color='orange' disabled={disable} h={50} onClick={() => updateSortType(false)}>Descending</Button>
        </Group>
    )
})

export default SortType