import React, { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { Markdown } from '../../markdown';
import { Box, CheckboxContainer, CheckboxCheck } from './Checkbox.styles';

export interface ICheckProps {
  name: string;
  label: string;
  validation?: string;
  className?: string;
  control: any;
}

export const CheckboxElement = forwardRef<HTMLInputElement, ICheckProps>(
  ({ label, name, validation, className, control }, ref) => {
    return (
      <>
        <CheckboxContainer>
          <Box>
            <Controller
              name={name}
              control={control}
              defaultValue={false}
              rules={{ required: true }}
              render={({ field }) => <CheckboxCheck {...field} />}
            />
          </Box>

          <Markdown children={label} className={className} />
        </CheckboxContainer>
        {validation && (
          <Markdown children={validation} className="validationText" />
        )}
      </>
    );
  }
);
