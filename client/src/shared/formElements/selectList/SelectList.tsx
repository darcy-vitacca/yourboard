import React, { forwardRef } from "react";
import { Markdown } from "../../markdown";
import { Controller } from "react-hook-form";
import {
  StyledMenuItem,
  StyledSelectList,
  useStylesSelectList,
} from "./SelectList.styles";
import Friend from "../../../../../server/src/entities/Friends";
import { InputContainer } from "../input/Input.styles";

export interface ISelectListProps {
  name: string;
  options: Friend[] | null;
  width?: "25%" | "50%" | "75%" | "100%";
  defaultValue: string;
  control?: any;
  setValue?: any;
  label: string;
  helperText: string;
}

export const SelectList = ({
  name,
  options,
  control,
  defaultValue,
  width,
  label,
  helperText,
  setValue,
}: ISelectListProps) => {
  const labelProps = {
    asterisk: <span className="asterisk">*</span>,
  };

  const classes = useStylesSelectList();

  return (
    <>
      <InputContainer width={width}>
        <Markdown children={label} className="label" />
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <StyledSelectList
              {...field}
              MenuProps={{ classes: { paper: classes.select } }}
              variant="outlined"
              onChange={(e) => {
                setValue(name, e.target.value);
              }}
            >
              {options &&
                options.map((item) => (
                  <StyledMenuItem
                    value={item.user_2_email}
                    key={item.user_2_email}
                  >
                    {item.user_2_name}
                  </StyledMenuItem>
                ))}
            </StyledSelectList>
          )}
        />
      </InputContainer>
    </>
  );
};
