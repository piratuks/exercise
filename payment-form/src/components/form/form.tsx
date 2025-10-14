import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ZodObject, type ZodRawShape, type ZodTypeAny } from 'zod/v3';
import { parseAmount } from '../../shared/parseAmount';

export type DynamicFormValues = Record<string, unknown>;

export type FieldDefinition = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  disabled?: boolean;
  helperText?: string;
  options?: { label: string; value: string | number; highlight: boolean }[];
  format?: (value: unknown) => string;
};

export type DynamicFormProps = {
  ref: React.Ref<unknown>;
  submitLabel: string;
  fields: FieldDefinition[];
  onSubmit: (data: unknown) => void;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'all' | 'onTouched';
  highlight?: { color: string; fontWeight: string };
  schema?: ZodTypeAny;
  locale?: 'en' | 'lt';
};

export const DynamicForm = ({
  fields,
  onSubmit,
  mode = 'onSubmit',
  ref,
  submitLabel,
  highlight = { color: 'red', fontWeight: 'bold' },
  schema,
  locale
}: DynamicFormProps) => {
  const isZodObject = <T extends ZodRawShape>(schema: ZodTypeAny): schema is ZodObject<T> =>
    schema instanceof ZodObject;

  const isFieldRequired = (fieldName: string, schema?: ZodTypeAny): boolean => {
    if (!schema) return false;
    if (!isZodObject(schema)) return false;

    const fieldSchema = schema.shape[fieldName];
    if (!fieldSchema) return false;

    return fieldSchema.isOptional?.() === false;
  };

  const methods = useForm<DynamicFormValues>({ mode: mode, resolver: schema ? zodResolver(schema) : undefined });

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = methods;

  const prevLocaleRef = React.useRef(locale);

  React.useImperativeHandle(ref, () => methods);

  React.useEffect(() => {
    fields.forEach(field => {
      const currentValue = getValues()[field.name];

      if (field.disabled && currentValue) {
        setValue(field.name, '', { shouldValidate: true });
        return;
      }

      if (field.format && prevLocaleRef.current !== locale && locale && prevLocaleRef.current) {
        const parsedCurrentValue = parseAmount(currentValue as string, prevLocaleRef.current!);

        if (parsedCurrentValue != null) {
          const formatted = field.format(parsedCurrentValue.toString());
          if (formatted !== parsedCurrentValue.toString()) {
            setValue(field.name, formatted);
          }
        }
      }
    });

    prevLocaleRef.current = locale;
  }, [locale, fields, getValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map(fieldItem => {
        const error = errors[fieldItem.name];
        const helperText = typeof error?.message === 'string' ? (error.message as string) : fieldItem.helperText || '';

        return (
          <FormControl
            fullWidth
            error={!!error}
            sx={{ mt: 1, mb: 1 }}
            key={fieldItem.name}
            disabled={fieldItem.disabled}
          >
            {fieldItem.type === 'select' && <InputLabel id={`${fieldItem.name}-label`}>{fieldItem.label}</InputLabel>}
            <Controller
              name={fieldItem.name}
              control={control}
              defaultValue=""
              render={({ field: controllerField }) => {
                return fieldItem.type === 'select' ? (
                  <Select
                    {...controllerField}
                    labelId={`${fieldItem.name}-label`}
                    disabled={fieldItem.disabled}
                    label={fieldItem.label}
                    renderValue={selected => {
                      const selectedOption = fieldItem.options?.find(o => o.value === selected);
                      return (
                        <Box
                          style={{
                            color: selectedOption?.highlight ? highlight.color : 'inherit',
                            fontWeight: selectedOption?.highlight ? highlight.fontWeight : 'normal'
                          }}
                        >
                          {selectedOption?.label || ''}
                        </Box>
                      );
                    }}
                  >
                    {fieldItem.options?.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                          color: 'inherit',
                          ...(option.highlight ? { color: highlight.color, fontWeight: highlight.fontWeight } : {})
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TextField
                    type={fieldItem.type}
                    disabled={fieldItem.disabled}
                    fullWidth
                    sx={{
                      marginTop: 1,
                      marginBottom: 1
                    }}
                    {...controllerField}
                    onBlur={e => {
                      if (fieldItem.format) {
                        const formatted = fieldItem.format(e.target.value);
                        e.target.value = formatted;
                      }

                      controllerField.onChange(e.target.value);
                    }}
                    label={fieldItem.label}
                    required={isFieldRequired(fieldItem.name, schema)}
                    error={!!errors[fieldItem.name]}
                  />
                );
              }}
            />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        );
      })}

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {submitLabel}
      </Button>
    </form>
  );
};
