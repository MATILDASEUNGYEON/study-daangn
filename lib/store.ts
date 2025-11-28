import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usedFilterReducer from './usedFilterSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    usedFilter: usedFilterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
