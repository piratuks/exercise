import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Countries, EmailProviders, Gender } from 'app/constant';
import { RootState } from './configureStore';

interface FormState {
  username?: string;
  age?: number;
  country?: Countries;
  gender?: Gender;
  containsEmails: EmailProviders[];
  dirtyFields: string[];
}
const initialState: FormState = {
  username: undefined,
  age: undefined,
  country: undefined,
  gender: undefined,
  containsEmails: [],
  dirtyFields: []
};

export const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      addDirtyField(state, 'username');
    },
    setAge: (state, action: PayloadAction<string>) => {
      if (isNaN(Number(action.payload))) return;
      if (Number(action.payload) < 1) return;
      state.age = Number(action.payload);
      addDirtyField(state, 'age');
    },
    setCountry: (state, action: PayloadAction<Countries | undefined>) => {
      state.country = action.payload;
      addDirtyField(state, 'country');
    },
    setGender: (state, action: PayloadAction<Gender | undefined>) => {
      state.gender = action.payload;
      addDirtyField(state, 'gender');
    },
    setEmailProviders: (state, action: PayloadAction<EmailProviders[]>) => {
      state.containsEmails = action.payload;
      addDirtyField(state, 'containsEmails');
    },
    resetState: state => {
      state.username = undefined;
      state.age = undefined;
      state.country = undefined;
      state.gender = undefined;
      state.containsEmails = [];
      state.dirtyFields = [];
    }
  }
});

const hasDirtyField = (state: FormState, field: string) => {
  return state.dirtyFields.some(dirtyField => dirtyField === field);
};
const addDirtyField = (state: FormState, field: string) => {
  if (hasDirtyField(state, field)) return;

  state.dirtyFields.push(field);
};
const getUsernameError = (state: FormState, checkDirty = true) => {
  if (hasDirtyField(state, 'username') || !checkDirty) {
    if (!state.username) return 'Field is required';
  }
};
const getAgeError = (state: FormState, checkDirty = true) => {
  if (hasDirtyField(state, 'age') || !checkDirty) {
    if (!state.age) return 'Field is required';
  }
};
const getCountryError = (state: FormState, checkDirty = true) => {
  if (hasDirtyField(state, 'country') || !checkDirty) {
    if (!state.country) return 'Field is required';
  }
};
const getGenderError = (state: FormState, checkDirty = true) => {
  if (hasDirtyField(state, 'gender') || !checkDirty) {
    if (!state.gender) return 'Field is required';
  }
};
const getContainsEmailsError = (state: FormState, checkDirty = true) => {
  if (hasDirtyField(state, 'containsEmails' || !checkDirty)) {
    if (!state.containsEmails.length) return 'Field is required';
  }
};

export const selectState = (state: RootState) => state.formSlice;
export const selectUsername = createSelector(selectState, state =>
  state.username === undefined ? '' : state.username
);
export const selectUsernameError = createSelector(selectState, state => getUsernameError(state));
export const selectAge = createSelector(selectState, state => (state.age === undefined ? '' : state.age));
export const selectAgeError = createSelector(selectState, state => getAgeError(state));
export const selectCountry = createSelector(selectState, state => (state.country === undefined ? '' : state.country));
export const selectCountryError = createSelector(selectState, state => getCountryError(state));
export const selectGender = createSelector(selectState, state => (state.gender === undefined ? '' : state.gender));
export const selectGenderError = createSelector(selectState, state => getGenderError(state));
export const selectEmailProvider = createSelector(selectState, state => state.containsEmails);
export const selectEmailProviderError = createSelector(selectState, state => getContainsEmailsError(state));
export const selectHasValidData = createSelector(selectState, state => {
  const errorForUser = getUsernameError(state, false);
  if (errorForUser) return false;

  const errorForAge = getAgeError(state, false);
  if (errorForAge) return false;

  const errorForCountry = getCountryError(state, false);
  if (errorForCountry) return false;

  const errorForGender = getGenderError(state, false);
  if (errorForGender) return false;

  const errorForContainEmails = getContainsEmailsError(state, false);
  if (errorForContainEmails) return false;

  return true;
});
export const selectSaveUserPayload = createSelector(selectState, state => {
  if (state.username && state.age !== undefined && state.country && state.gender)
    return {
      username: state.username,
      age: state.age,
      country: state.country,
      gender: state.gender,
      containsEmails: state.containsEmails
    };

  return null;
});

export const { setUsername, setAge, setCountry, setGender, setEmailProviders, resetState } = formSlice.actions;
