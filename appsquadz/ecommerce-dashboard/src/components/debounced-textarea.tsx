import React, { useState, useEffect, ChangeEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface DebouncedTextFieldProps extends Omit<TextFieldProps, "onChange"> {
  onChangeDebounced: (value: string) => void;
  debounceDelay?: number;
}

const DebouncedTextField: React.FC<DebouncedTextFieldProps> = ({
  onChangeDebounced,
  debounceDelay = 500, // Default debounce delay of 500ms
  ...textFieldProps
}) => {
  const [textValue, setTextValue] = useState<string>("");

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setTextValue(value);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      onChangeDebounced(textValue);
    }, debounceDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [onChangeDebounced, debounceDelay, textValue, handleChange]);

  return (
    <TextField {...textFieldProps} value={textValue} onChange={handleChange} />
  );
};

export default DebouncedTextField;
