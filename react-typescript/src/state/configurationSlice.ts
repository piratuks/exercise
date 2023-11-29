import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnvConfig } from './configurationApi';
import { RootState } from './configureStore';

export interface ConfigurationState {
  configuration: EnvConfig | null;
  isInitialized: boolean;
}

const initialState: ConfigurationState = {
  configuration: null,
  isInitialized: false
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    configurationLoaded: (state, action: PayloadAction<EnvConfig>) => {
      state.configuration = action.payload;
      state.isInitialized = true;
    }
  }
});

export const selectIsconfigurationInitialized = (state: RootState) => state.configuration.isInitialized;
export const selectConfiguration = (state: RootState) => state.configuration.configuration;
export const { configurationLoaded } = configurationSlice.actions;
