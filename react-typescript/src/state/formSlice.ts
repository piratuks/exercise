import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Countries, EmailProviders, FieldType, Gender } from 'app/constant';
import { RootState } from './configureStore';
import { ExtraProps } from './formDynamicFieldSlice';

interface FormState {
  username?: string;
  age?: number;
  country?: Countries;
  gender?: Gender;
  containsEmails: EmailProviders[];
  dirtyFields: string[];
  dynamicFields: FormDynamicField[];
  dynamicFieldsFormated?: Record<string, FormDynamicField>;
}
export interface FormDynamicField {
  fieldType: FieldType;
  label: string;
  isRequired: boolean;
  extra: ExtraProps;
  error?: string;
}
const initialState: FormState = {
  username: undefined,
  age: undefined,
  country: undefined,
  gender: undefined,
  containsEmails: [],
  dirtyFields: [],
  dynamicFields: [],
  dynamicFieldsFormated: undefined
};

export const returnFormatedDynamicFields = (oldObject: FormDynamicField[], allLabels: string[]) => {
  const labels: Record<string, FormDynamicField> = {};
  allLabels.forEach(l => {
    const object = oldObject.find(item => item.label === l);
    if (object) labels[l] = object;
  });
  return labels;
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
    setDynamicFields: (state, action: PayloadAction<FormDynamicField>) => {
      if (!state.dynamicFields.some(item => item.label === action.payload.label))
        state.dynamicFields.push(action.payload);

      state.dynamicFieldsFormated = returnFormatedDynamicFields(
        state.dynamicFields,
        state.dynamicFields.map(item => item.label)
      );
    },
    removeDynamicField: (state, action: PayloadAction<string>) => {
      state.dynamicFields = state.dynamicFields.filter(item => item.label !== action.payload);
      if (state.dynamicFieldsFormated) delete state.dynamicFieldsFormated[action.payload];
    },
    setDynamicFieldsValue: (state, action: PayloadAction<{ label: string; value: string }>) => {
      if (!state.dynamicFieldsFormated) return;

      const dynamicField = state.dynamicFieldsFormated[action.payload.label];

      if (!dynamicField || !dynamicField.extra) return;

      let dynamicFieldExtra = dynamicField.extra[dynamicField.fieldType];

      if (dynamicFieldExtra === null) {
        dynamicField.extra[dynamicField.fieldType] = { value: action.payload.value };
        dynamicFieldExtra = dynamicField.extra[dynamicField.fieldType];
      } else {
        dynamicFieldExtra.value = action.payload.value;
      }

      const key = `dynamicField.${action.payload.label}.${dynamicField.fieldType}`;
      addDirtyField(state, key);

      if (hasDirtyField(state, key)) {
        if (dynamicFieldExtra && !dynamicFieldExtra.value && dynamicField.isRequired)
          dynamicField.error = 'Field is required';
        else dynamicField.error = undefined;
      }
    },
    resetState: state => {
      state.username = undefined;
      state.age = undefined;
      state.country = undefined;
      state.gender = undefined;
      state.containsEmails = [];
      state.dirtyFields = [];
      state.dynamicFields = [];
      state.dynamicFieldsFormated = undefined;
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
export const selectDynamicFieldsFormated = createSelector(selectState, state => state.dynamicFieldsFormated);
export const selectDynamicFieldsKeys = createSelector(selectState, state =>
  state.dynamicFields.map(item => item.label)
);
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

  if (state.dynamicFieldsFormated) {
    let valid = true;
    for (const key in state.dynamicFieldsFormated) {
      const ft = state.dynamicFieldsFormated[key].extra[state.dynamicFieldsFormated[key].fieldType];
      if (
        state.dynamicFieldsFormated[key].error !== undefined ||
        ((!ft || !ft.value) && state.dynamicFieldsFormated[key].isRequired)
      ) {
        valid = false;
        break;
      }
      if (state.dynamicFieldsFormated[key].error !== undefined) {
      }
    }
    if (!valid) return false;
  }

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

export const {
  setUsername,
  setAge,
  setCountry,
  setGender,
  setEmailProviders,
  resetState,
  setDynamicFields,
  setDynamicFieldsValue,
  removeDynamicField
} = formSlice.actions;
