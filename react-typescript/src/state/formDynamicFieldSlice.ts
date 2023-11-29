import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { FieldType } from 'app/constant';
import { RootState } from './configureStore';

export interface ExtraProps {
  [FieldType.text]: null | { [key: string]: unknown; value?: string };
  [FieldType.number]: null | { [key: string]: unknown; value?: string };
  [FieldType.dropdown]: null | { dropdownValues?: string[]; value?: string };
  [FieldType.radio]: null | { choices?: string[]; value?: string };
}

interface FormDynamicFieldState {
  dirtyFields: string[];
  fieldType?: FieldType;
  label?: string;
  isRequired: boolean;
  extra: ExtraProps;
}
const initialState: FormDynamicFieldState = {
  fieldType: undefined,
  label: undefined,
  isRequired: false,
  extra: {
    [FieldType.text]: null,
    [FieldType.number]: null,
    [FieldType.dropdown]: {
      dropdownValues: []
    },
    [FieldType.radio]: {
      choices: []
    }
  },
  dirtyFields: []
};

export const formDynamicFieldSlice = createSlice({
  name: 'formDynamicFieldSlice',
  initialState,
  reducers: {
    setFieldType: (state, action: PayloadAction<FieldType | undefined>) => {
      state.fieldType = action.payload;
      addDirtyField(state, 'fieldType');
    },
    setLabel: (state, action: PayloadAction<string>) => {
      state.label = action.payload;
      addDirtyField(state, 'label');
    },
    setIsRequired: (state, action: PayloadAction<boolean>) => {
      state.isRequired = action.payload;
      addDirtyField(state, 'isRequired');
    },
    setChoices: (state, action: PayloadAction<string>) => {
      if (!state.fieldType || !action.payload) return;

      if (state.fieldType === FieldType.dropdown) {
        let dropdownField = state.extra[state.fieldType];
        if (dropdownField === null)
          state.extra[state.fieldType] = {
            dropdownValues: [action.payload]
          };
        dropdownField = state.extra[state.fieldType];
        if (
          dropdownField &&
          dropdownField.dropdownValues &&
          !dropdownField.dropdownValues.some(item => item === action.payload)
        ) {
          dropdownField.dropdownValues.push(action.payload);
        }
      } else if (state.fieldType === FieldType.radio) {
        let choices = state.extra[state.fieldType];
        if (choices === null)
          state.extra[state.fieldType] = {
            choices: [action.payload]
          };
        choices = state.extra[state.fieldType];

        const choiceField = state.extra[state.fieldType];
        if (choiceField && choiceField.choices && !choiceField.choices.some(item => item === action.payload)) {
          choiceField.choices.push(action.payload);
        }
      }

      addDirtyField(state, `extra.${state.fieldType}`);
    },
    removeChoices: (state, action: PayloadAction<string>) => {
      if (!state.fieldType) return;

      if (state.fieldType === FieldType.dropdown) {
        const dynamicField = state.extra[state.fieldType];
        if (!dynamicField || !dynamicField.dropdownValues) return;

        dynamicField.dropdownValues = dynamicField.dropdownValues.filter(item => item !== action.payload);
      } else if (state.fieldType === FieldType.radio) {
        const dynamicField = state.extra[state.fieldType];
        if (!dynamicField || !dynamicField.choices) return;

        dynamicField.choices = dynamicField.choices.filter(item => item !== action.payload);
      }
    },
    resetState: state => {
      state.fieldType = undefined;
      state.label = undefined;
      state.isRequired = false;
      state.dirtyFields = [];
      state.extra = {
        TextInput: null,
        NumberInput: null,
        Dropdown: {
          dropdownValues: []
        },
        RadioInput: {
          choices: []
        }
      };
    }
  }
});

const hasDirtyField = (state: FormDynamicFieldState, field: string) => {
  return state.dirtyFields.some(dirtyField => dirtyField === field);
};
const addDirtyField = (state: FormDynamicFieldState, field: string) => {
  if (hasDirtyField(state, field)) return;

  state.dirtyFields.push(field);
};
const getFieldTypeError = (state: FormDynamicFieldState, checkDirty = true) => {
  if (hasDirtyField(state, 'fieldType') || !checkDirty) {
    if (!state.fieldType) return 'Field is required';
  }
};
const getLabelError = (state: FormDynamicFieldState, checkDirty = true) => {
  if (hasDirtyField(state, 'label') || !checkDirty) {
    if (!state.label) return 'Field is required';
  }
};
const getChoicesError = (state: FormDynamicFieldState, checkDirty = true) => {
  if (state.fieldType === FieldType.radio && (hasDirtyField(state, 'extra.RadioInput') || !checkDirty)) {
    const dynamicField = state.extra[state.fieldType];

    if (!dynamicField || (dynamicField && dynamicField.choices && !dynamicField.choices.length))
      return 'Field is required';
  }
  if (state.fieldType === FieldType.dropdown && (hasDirtyField(state, 'extra.Dropdown') || !checkDirty)) {
    const dynamicField = state.extra[state.fieldType];
    if (!dynamicField || (dynamicField && dynamicField.dropdownValues && !dynamicField.dropdownValues.length))
      return 'Field is required';
  }
};

export const selectState = (state: RootState) => state.formDynamicFieldSlice;
export const selectFieldType = createSelector(selectState, state =>
  state.fieldType === undefined ? '' : state.fieldType
);
export const selectFieldTypeError = createSelector(selectState, state => getFieldTypeError(state));
export const selectLabel = createSelector(selectState, state => (state.label === undefined ? '' : state.label));
export const selectLabelError = createSelector(selectState, state => getLabelError(state));
export const selectIsRequired = createSelector(selectState, state => state.isRequired);
export const selectChoices = createSelector(selectState, state => {
  if (state.fieldType === FieldType.dropdown) {
    const dynamicField = state.extra[state.fieldType];

    return dynamicField ? dynamicField.dropdownValues ?? [] : [];
  }

  if (state.fieldType === FieldType.radio) {
    const dynamicField = state.extra[state.fieldType];

    return dynamicField ? dynamicField.choices ?? [] : [];
  }

  return [];
});
export const selectExtras = createSelector(selectState, state => state.extra);
export const selectChoicesError = createSelector(selectState, state => getChoicesError(state));

export const selectHasValidData = createSelector(selectState, state => {
  const errorForFieldType = getFieldTypeError(state, false);
  if (errorForFieldType) return false;

  const errorForLabel = getLabelError(state, false);
  if (errorForLabel) return false;

  const errorForChoices = getChoicesError(state, false);
  if (errorForChoices) return false;

  return true;
});

export const { setFieldType, setLabel, resetState, setIsRequired, setChoices, removeChoices } =
  formDynamicFieldSlice.actions;
