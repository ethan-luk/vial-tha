import { forwardRef } from "react";
import { Button } from "@mantine/core";
import { GoSortAsc } from "react-icons/go";
import "../styles.css";

const sortButton = forwardRef<HTMLButtonElement, { activeSort: boolean }>(
  ({ activeSort, ...others }, ref) => {
    const button = (
      <Button
        ref={ref}
        w={activeSort ? "120px" : "100px"}
        h={40}
        justify="flex-start"
        variant={activeSort ? "light" : "outline"}
        color="green"
        radius="md"
        leftSection={<GoSortAsc size={18} />}
        rightSection={activeSort && <div className={`circle`}>1</div>}
        {...others}
      >
        Sort
      </Button>
    );
    return button;
  }
);

export default sortButton;
