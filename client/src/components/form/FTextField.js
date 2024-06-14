import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, type, min, max, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          fullWidth
          error={!!error}
          helperText={error?.message}
          inputProps={
            type === 'number' ? { ...field.inputProps, min, max } : field.inputProps
          }
          {...other}
        />
      )}
    />
  );
}

export default FTextField;