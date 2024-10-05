import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import carouselSlice from './carousel/carousel.slice';
import { cartSlice } from './cart/cart.slice';
import { userSlice } from './user/user.slice';
import {
    FLUSH,
    PAUSE,
    PERSIST, 
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';

const persistConfig = {
    key: 'amazon-v2',
    storage,
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    carousel: carouselSlice.name, // reducer
    user: userSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
