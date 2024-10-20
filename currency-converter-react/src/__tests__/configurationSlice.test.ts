import { ConfigurationState, configurationLoaded, configurationSlice } from 'state/configurationSlice';

describe('configurationSlice', () => {
  let initialState: ConfigurationState;

  beforeEach(() => {
    initialState = {
      configuration: null,
      isInitialized: false
    };
  });

  it('should handle initial state', () => {
    expect(configurationSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle configurationLoaded', () => {
    const mockConfig = {
      environment: 'test',
      apiEndpoint: 'api/test'
    };
    const action = configurationLoaded(mockConfig);

    const state = configurationSlice.reducer(initialState, action);

    expect(state.configuration).toEqual(mockConfig);
    expect(state.isInitialized).toBe(true);
  });
});
