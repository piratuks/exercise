import { Add } from '@mui/icons-material';
import {
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { FieldType } from 'app/constant';
import * as React from 'react';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'state/configureStore';
import {
  removeChoices,
  resetState,
  selectChoices,
  selectChoicesError,
  selectExtras,
  selectFieldType,
  selectFieldTypeError,
  selectHasValidData,
  selectIsRequired,
  selectLabel,
  selectLabelError,
  setChoices,
  setFieldType,
  setIsRequired,
  setLabel
} from 'state/formDynamicFieldSlice';
import { setDynamicFields } from 'state/formSlice';
import { getEnumValue } from 'utils/stateUtils';

export const AddFormField: FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const fieldTypeError = useAppSelector(selectFieldTypeError);
  const labelError = useAppSelector(selectLabelError);
  const choices = useAppSelector(selectChoices);
  const fieldType = useAppSelector(selectFieldType);
  const choicesError = useAppSelector(selectChoicesError);
  const [localChoices, setLocalChoices] = useState('');
  const hasValidData = useAppSelector(selectHasValidData);
  const fieldLabel = useAppSelector(selectLabel);
  const isRequired = useAppSelector(selectIsRequired);
  const extras = useAppSelector(selectExtras);

  const handleClickShowPassword = () => {
    dispatch(setChoices(localChoices));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getFieldType = (passedValue: string | null) => {
    return getEnumValue(passedValue, FieldType) as FieldType;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetState());
  };

  const handleAdd = () => {
    if (fieldType)
      dispatch(
        setDynamicFields({
          fieldType: fieldType,
          label: fieldLabel,
          isRequired: isRequired,
          extra: extras
        })
      );
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Field
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Form Field</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'start',
              justifyContent: 'start',
              padding: 2,
              gap: 5,
              margin: 'auto'
            }}
          >
            <Box>
              <FormControl required sx={{ width: 220 }} error={fieldTypeError !== undefined}>
                <InputLabel shrink={true}>Field Type</InputLabel>
                <Select
                  input={<OutlinedInput notched label="Field Type" />}
                  fullWidth
                  value={fieldType}
                  onChange={e => {
                    dispatch(setFieldType(getFieldType(e.target.value)));
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.values(FieldType).map((val, index) => (
                    <MenuItem value={val} key={index}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
                {fieldTypeError && <FormHelperText>{fieldTypeError}</FormHelperText>}
              </FormControl>
            </Box>
            <Box>
              <FormControl required sx={{ width: 220 }}>
                <TextField
                  label="Label"
                  variant="outlined"
                  required
                  value={fieldLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => {
                    dispatch(setLabel(e.target.value));
                  }}
                  error={labelError !== undefined}
                  helperText={labelError}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: 220 }}>
              <FormControlLabel
                control={
                  <Switch
                    required
                    checked={useAppSelector(selectIsRequired)}
                    onChange={e => {
                      dispatch(setIsRequired(e.target.checked));
                    }}
                  />
                }
                label="is required"
              />
            </Box>
            {(fieldType === FieldType.dropdown || fieldType === FieldType.radio) && (
              <Box>
                <Box sx={{ width: 220 }}>
                  <FormControl required variant="outlined" error={choicesError !== undefined}>
                    <InputLabel shrink={true}>Choices</InputLabel>
                    <OutlinedInput
                      type={'text'}
                      label="Choices"
                      notched
                      onChange={e => {
                        setLocalChoices(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            <Add />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {choicesError && <FormHelperText>{choicesError}</FormHelperText>}
                  </FormControl>
                </Box>
                <Box sx={{ width: 220, marginTop: '5px' }}>
                  {choices.map((val, index) => (
                    <Chip
                      label={val}
                      key={index}
                      onDelete={e => {
                        dispatch(removeChoices(val));
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!hasValidData}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
