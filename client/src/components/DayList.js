import React, { useState } from "react";
import Chip from "@mui/material/Chip";

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
    <div>
      {[...Array(31)].map((_, i) => {
        const day = i + 1;
        const isSelected = selectedDays.includes(day);
        return (
          <Chip
            key={day}
            label={day}
            color={isSelected ? "primary" : "default"}
            onClick={() => handleDayClick(day)}
          />
        );
      })}
    </div>
  );
}
