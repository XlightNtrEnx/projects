import { configureStore } from '@reduxjs/toolkit';
import verifyAuthenticationEffectDependencyReducer from '../slices/verifyAuthenticationEffectDependencySlice';
import authenticationStatusReducer from '../slices/authenticationStatusSlice';
import {
  useSelector as useTypedSelector,
  useDispatch as useTypedDispatch,
  TypedUseSelectorHook,
} from 'react-redux';

const store = configureStore({
  reducer: {
    verifyAuthenticationEffectDependency: verifyAuthenticationEffectDependencyReducer,
    authenticationStatus: authenticationStatusReducer
  }
});

export default store;
export type StateType = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<StateType> = useTypedSelector;
export type DispatchType = typeof store.dispatch;
export const useDispatch: () => DispatchType = useTypedDispatch;;