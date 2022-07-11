import { createSlice, configureStore } from '@reduxjs/toolkit'

export const verifyAuthenticationEffectDependencySlice = createSlice({
  name: 'verifyAuthenticationEffectDependency',
  initialState: {
    value: true
  },
  reducers: {
    toggle: state => {
      if (state.value === true) {
        state.value = false;
      } else {
        state.value = true;
      }
    }
  }
});

export const { toggle } = verifyAuthenticationEffectDependencySlice.actions;
export default verifyAuthenticationEffectDependencySlice.reducer;