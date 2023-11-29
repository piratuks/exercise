import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Countries, EmailProviders, Gender } from 'app/constant';
import { FC, useEffect } from 'react';
import { getErrorMessage } from 'state/apiError';
import { useAppDispatch, useAppSelector } from 'state/configureStore';
import { useSaveUserMutation } from 'state/formApi';
import {
  resetState,
  selectAge,
  selectAgeError,
  selectCountry,
  selectCountryError,
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
  setEmailProviders,
  setGender,
  setUsername
} from 'state/formSlice';
import { disableLoading, enableLoading } from 'state/pageSlice';
import { ToastType, toastAdd } from 'state/toatsSlice';
import { v4 as uuidv4 } from 'uuid';

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

  const getEnumValue = (passedValue: string | null, data: { [s: number]: string }) => {
    if (passedValue) {
      const match = Object.entries(data).find(([key, value]) => value === passedValue);
      if (match) {
        const [_key, value] = match;
        return value;
      }
    }

    return undefined;
  };

  const getCountry = (passedValue: string | null) => {
    return getEnumValue(passedValue, Countries) as Countries;
  };

  const getGender = (passedValue: string | null) => {
    return getEnumValue(passedValue, Gender) as Gender;
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', flexGrow: 1 }}>
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
