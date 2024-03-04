import React from "react";
import { Button, Group } from "@mantine/core";

interface SortTypeProps {
  updateSortType: (sortAsc: boolean | null) => void;
  disable: boolean;
  currentType: boolean | null;
}

const SortType: React.FC<SortTypeProps> = React.forwardRef(
  ({ updateSortType, disable, currentType }, _) => {
    return (
      <Group gap={2} pe="md" ps="md" justify="center" grow>
        <Button
          variant={currentType ? "filled" : "outline"}
          color="orange"
          disabled={disable}
          h={35}
          onClick={() => updateSortType(true)}
        >
          Ascending
        </Button>
        <Button
          variant={currentType == false ? "filled" : "outline"}
          color="orange"
          disabled={disable}
          h={35}
          onClick={() => updateSortType(false)}
        >
          Descending
        </Button>
      </Group>
    );
  }
);

export default SortType;
