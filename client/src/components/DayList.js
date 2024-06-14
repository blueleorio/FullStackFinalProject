import { useState } from "react";
import { Chip, Box } from "@mui/material";

export default function DaysList({ onDayChange }) {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayClick = (day) => {
    let newSelectedDays;
    if (selectedDays.includes(day)) {
      newSelectedDays = selectedDays.filter((d) => d !== day);
    } else {
      newSelectedDays = [...selectedDays, day];
    }
    setSelectedDays(newSelectedDays);

    if (onDayChange) {
      onDayChange(newSelectedDays);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {[...Array(31)].map((_, i) => {
        const day = i + 1;
        const isSelected = selectedDays.includes(day);
        return (
          <Box sx={{ width: "14.28%", p: 0.5 }} key={day}>
            <Chip
              label={day}
              color={isSelected ? "primary" : "default"}
              onClick={() => handleDayClick(day)}
              fullwidth="true"
            />
          </Box>
        );
      })}
    </Box>
  );
}
