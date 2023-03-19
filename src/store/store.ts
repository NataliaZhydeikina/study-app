import { configureStore } from "@reduxjs/toolkit";
import { coursesAPI } from "../api/CoursesApi";
import tokenReducer from "./reducers/tokenReducer";

export const rootReducer = {
    tokenReducer,
    [coursesAPI.reducerPath]: coursesAPI.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(coursesAPI.middleware);
    }
});
