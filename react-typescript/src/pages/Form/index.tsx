import { Remove } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Countries, EmailProviders, FieldType, Gender } from 'app/constant';
import { FC, useEffect } from 'react';
import { getErrorMessage } from 'state/apiError';
import { useAppDispatch, useAppSelector } from 'state/configureStore';
import { useSaveUserMutation } from 'state/formApi';
import {
  FormDynamicField,
  removeDynamicField,
  resetState,
  selectAge,
  selectAgeError,
  selectCountry,
  selectCountryError,
  selectDynamicFieldsFormated,
  selectDynamicFieldsKeys,
  selectEmailProvider,
  selectEmailProviderError,
  selectGender,
  selectGenderError,
  selectHasValidData,
  selectSaveUserPayload,
  selectUsername,
  selectUsernameError,
  setAge,
  setCountry,
  setDynamicFieldsValue,
  setEmailProviders,
  setGender,
  setUsername
} from 'state/formSlice';
import { disableLoading, enableLoading } from 'state/pageSlice';
import { ToastType, toastAdd } from 'state/toatsSlice';
import { getEnumValue } from 'utils/stateUtils';
import { v4 as uuidv4 } from 'uuid';
import { AddFormField } from './AddFormField';

export const FormPage: FC = () => {
  const dispatch = useAppDispatch();

  const usernameError = useAppSelector(selectUsernameError);
  const ageError = useAppSelector(selectAgeError);
  const countryError = useAppSelector(selectCountryError);
  const genderError = useAppSelector(selectGenderError);
  const emailProviderError = useAppSelector(selectEmailProviderError);
  const hasValidData = useAppSelector(selectHasValidData);
  const payload = useAppSelector(selectSaveUserPayload);
  const [updatePost, { error, data, isSuccess, isLoading }] = useSaveUserMutation();
  const dynamicFieldsFormated = useAppSelector(selectDynamicFieldsFormated);
  const dynamicFieldsKeys = useAppSelector(selectDynamicFieldsKeys);

  useEffect(() => {
    if (isLoading) dispatch(enableLoading());
    else dispatch(disableLoading());
  }, [isLoading]);

  useEffect(() => {
    if (error)
      dispatch(
        toastAdd({
          id: uuidv4(),
          desc: getErrorMessage(error),
          autoDeleteTime: 6000,
          type: ToastType.error
        })
      );
  }, [error]);

  useEffect(() => {
    if (isSuccess)
      dispatch(
        toastAdd({
          id: uuidv4(),
          desc: data?.message ?? 'Create new user Succeeded',
          autoDeleteTime: 6000,
          type: ToastType.success
        })
      );
  }, [isSuccess]);

  useEffect(() => {
    if (data && data.operationResult) dispatch(resetState());
  }, [data]);

  const getCountry = (passedValue: string | null) => {
    return getEnumValue(passedValue, Countries) as Countries;
  };

  const getGender = (passedValue: string | null) => {
    return getEnumValue(passedValue, Gender) as Gender;
  };

  const getDynamicFieldValue = (formDynamicField: FormDynamicField) => {
    return formDynamicField.extra[formDynamicField.fieldType]?.value ?? '';
  };

  const handleClickShow = (key: string) => {
    dispatch(removeDynamicField(key));
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getDynamicChoices = (formDynamicField: FormDynamicField) => {
    let data: string[] = [];
    if (formDynamicField.fieldType === FieldType.dropdown) {
      const extras = formDynamicField.extra[formDynamicField.fieldType];
      if (extras) {
        data = extras.dropdownValues ?? [];
      }
    }
    if (formDynamicField.fieldType === FieldType.radio) {
      const extras = formDynamicField.extra[formDynamicField.fieldType];
      if (extras) {
        data = extras.choices ?? [];
      }
    }

    return data;
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'start',
          justifyContent: 'start',
          width: 500,
          gap: 5,
          margin: 'auto',
          border: '1px solid #1565c0',
          padding: 5,
          borderRadius: 5
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', flexGrow: 1, width: '100%' }}>
          <AddFormField />
        </Box>
        <Box>
          <FormControl required sx={{ width: 220 }}>
            <TextField
              label="Username"
              variant="outlined"
              required
              value={useAppSelector(selectUsername)}
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => {
                dispatch(setUsername(e.target.value));
              }}
              error={usernameError !== undefined}
              helperText={usernameError}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl required sx={{ width: 220 }}>
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              required
              value={useAppSelector(selectAge)}
              InputLabelProps={{
                shrink: true
              }}
              onKeyDown={evt => {
                if (isNaN(Number(evt.key))) evt.preventDefault();
              }}
              inputProps={{ pattern: '([^0-9]*)' }}
              onChange={e => {
                dispatch(setAge(e.target.value));
              }}
              error={ageError !== undefined}
              helperText={ageError}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl required sx={{ width: 220 }} error={countryError !== undefined}>
            <InputLabel shrink={true}>Country</InputLabel>
            <Select
              input={<OutlinedInput notched label="Country" />}
              fullWidth
              value={useAppSelector(selectCountry)}
              onChange={e => {
                dispatch(setCountry(getCountry(e.target.value)));
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.values(Countries).map((val, index) => (
                <MenuItem value={val} key={index}>
                  {val}
                </MenuItem>
              ))}
            </Select>
            {countryError && <FormHelperText>{countryError}</FormHelperText>}
          </FormControl>
        </Box>
        <Box>
          <FormControl required sx={{ width: 220 }} error={emailProviderError !== undefined}>
            <InputLabel shrink={true}>Contains Emails</InputLabel>
            <Select
              multiple
              fullWidth
              input={<OutlinedInput notched label="Contains Emails" />}
              value={useAppSelector(selectEmailProvider)}
              onChange={e => {
                if (typeof e.target.value !== 'string') dispatch(setEmailProviders(e.target.value));
              }}
            >
              {Object.values(EmailProviders).map((val, index) => (
                <MenuItem value={val} key={index}>
                  {val}
                </MenuItem>
              ))}
            </Select>
            {emailProviderError && <FormHelperText>{emailProviderError}</FormHelperText>}
          </FormControl>
        </Box>
        <Box>
          <FormControl required sx={{ width: 220 }} error={genderError !== undefined}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              value={useAppSelector(selectGender)}
              onChange={e => {
                dispatch(setGender(getGender(e.target.value)));
              }}
            >
              {Object.values(Gender).map((val, index) => (
                <FormControlLabel key={index} value={val} control={<Radio />} label={val} />
              ))}
            </RadioGroup>
            {genderError && <FormHelperText>{genderError}</FormHelperText>}
          </FormControl>
        </Box>

        {dynamicFieldsKeys.map((dynamicFieldKey, index) => (
          <Box key={index}>
            {dynamicFieldsFormated &&
              (dynamicFieldsFormated[dynamicFieldKey].fieldType === FieldType.text ||
                dynamicFieldsFormated[dynamicFieldKey].fieldType === FieldType.number) && (
                <FormControl required sx={{ width: 200 }}>
                  <TextField
                    label={dynamicFieldsFormated[dynamicFieldKey].label}
                    variant="outlined"
                    type={dynamicFieldsFormated[dynamicFieldKey].fieldType === FieldType.number ? 'number' : 'string'}
                    required={dynamicFieldsFormated[dynamicFieldKey].isRequired}
                    value={getDynamicFieldValue(dynamicFieldsFormated[dynamicFieldKey])}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onKeyDown={evt => {
                      if (
                        dynamicFieldsFormated[dynamicFieldKey].fieldType === FieldType.number &&
                        isNaN(Number(evt.key))
                      )
                        evt.preventDefault();
                    }}
                    inputProps={
                      dynamicFieldsFormated[dynamicFieldKey].fieldType === FieldType.number
                        ? { pattern: '([^0-9]*)' }
                        : undefined
                    }
                    onChange={e => {
                      dispatch(
                        setDynamicFieldsValue({
                          label: dynamicFieldsFormated[dynamicFieldKey].label,
                          value: e.target.value
                        })
                      );
                    }}
                    error={dynamicFieldsFormated[dynamicFieldKey].error !== undefined}
                    helperText={dynamicFieldsFormated[dynamicFieldKey].error}
                  />
                </FormControl>
              )}
            {dynamicFieldsFormated && dynamicFieldsFormated[dynamicFieldKey].fieldType === FieldType.dropdown && (
              <FormControl
                required={dynamicFieldsFormated[dynamicFieldKey].isRequired}
                sx={{ width: 200 }}
                error={dynamicFieldsFormated[dynamicFieldKey].error !== undefined}
              >
                <InputLabel shrink={true}>{dynamicFieldsFormated[dynamicFieldKey].label}</InputLabel>
                <Select
                  input={<OutlinedInput notched label={dynamicFieldsFormated[dynamicFieldKey].label} />}
                  fullWidth
                  value={getDynamicFieldValue(dynamicFieldsFormated[dynamicFieldKey])}
                  onChange={e => {
                    dispatch(
                      setDynamicFieldsValue({
                        label: dynamicFieldsFormated[dynamicFieldKey].label,
                        value: e.target.value
                      })
                    );
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {getDynamicChoices(dynamicFieldsFormated[dynamicFieldKey]).map((val, index) => (
                    <MenuItem value={val} key={index}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
                {dynamicFieldsFormated[dynamicFieldKey].error && (
                  <FormHelperText>{dynamicFieldsFormated[dynamicFieldKey].error}</FormHelperText>
                )}
              </FormControl>
            )}
            {dynamicFieldsFormated && dynamicFieldsFormated[dynamicFieldKey].fieldType === FieldType.radio && (
              <FormControl
                required={dynamicFieldsFormated[dynamicFieldKey].isRequired}
                sx={{ width: 200 }}
                error={dynamicFieldsFormated[dynamicFieldKey].error !== undefined}
              >
                <FormLabel>{dynamicFieldsFormated[dynamicFieldKey].label}</FormLabel>
                <RadioGroup
                  value={getDynamicFieldValue(dynamicFieldsFormated[dynamicFieldKey])}
                  onChange={e => {
                    dispatch(
                      setDynamicFieldsValue({
                        label: dynamicFieldsFormated[dynamicFieldKey].label,
                        value: e.target.value
                      })
                    );
                  }}
                >
                  {getDynamicChoices(dynamicFieldsFormated[dynamicFieldKey]).map((val, index) => (
                    <FormControlLabel key={index} value={val} control={<Radio />} label={val} />
                  ))}
                </RadioGroup>
                {dynamicFieldsFormated[dynamicFieldKey].error && (
                  <FormHelperText>{dynamicFieldsFormated[dynamicFieldKey].error}</FormHelperText>
                )}
              </FormControl>
            )}
            <IconButton
              sx={{ width: 20 }}
              onClick={() => {
                handleClickShow(dynamicFieldKey);
              }}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              <Remove />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', flexGrow: 1, width: '100%' }}>
          <Button
            variant="contained"
            disabled={!hasValidData || isLoading}
            onClick={() => {
              if (payload) updatePost(payload);
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </>
  );
};
