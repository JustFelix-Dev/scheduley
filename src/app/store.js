import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {persistReducer, persistStore, FLUSH,PURGE,PAUSE,REGISTER,REHYDRATE,PERSIST} from 'redux-persist'
import storage from "redux-persist/lib/storage" // defaults to localStorage for web  
import userSlice from "../features/user/userSlice";
import taskSlice from "../features/task/taskSlice";

const persistConfig = {
    key: "root",
    storage,
    version: 1 
}

const rootReducer = combineReducers({
      user : userSlice,
      task : taskSlice
})
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck : {
            ignoreActions: [FLUSH,PURGE,PAUSE,REGISTER,REHYDRATE,PERSIST]
        }
    })
})

export const persistor = persistStore(store)