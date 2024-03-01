import { DateInput } from "@mantine/dates";
import { useState } from "react";

const DatePicker = () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DateInput
        value={value}
        onChange={setValue}
        label="Date input"
        placeholder="Date input"
      />
    );
}

export default DatePicker