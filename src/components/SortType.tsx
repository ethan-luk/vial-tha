import React, { useState } from "react";
import { Button, Group } from "@mantine/core";
import { RiSortAsc , RiSortDesc} from "react-icons/ri";

interface SortTypeProps {
  updateSortType: (sortAsc: boolean | null) => void;
  disable: boolean;
  currentType: boolean | null;
}

const SortType: React.FC<SortTypeProps> = React.forwardRef(
  ({ updateSortType, disable, currentType }, _) => {

    const [type, setType] = useState<boolean | null>(currentType)

    const handleSortPress = (ascending: boolean) => {
        setType(ascending)
        updateSortType(ascending)
    }

    return (
      <Group gap={2} pe="md" ps="md" justify="center" grow>
        <Button
          variant={type ? "filled" : "outline"}
          color="orange"
          disabled={disable}
          h={35}
          onClick={() => handleSortPress(true)}
        >
            <Group justify="center">
                <RiSortAsc size={16}/>
                Ascending
            </Group>
        </Button>
        <Button
          variant={type == false ? "filled" : "outline"}
          color="orange"
          disabled={disable}
          h={35}
          onClick={() => handleSortPress(false)}
        >
          <Group justify="center">
                <RiSortDesc size={16}/>
                Descending
            </Group>
        </Button>
      </Group>
    );
  }
);

export default SortType;
