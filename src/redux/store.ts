import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'
import {authSliceReducer} from './slices/authSlice'
import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})

export type AppDispatch = typeof store.dispatch
export const  useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types