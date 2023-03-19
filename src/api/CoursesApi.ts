import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { ICourse } from '../store/typings/ICourse';
import { ICourses } from '../store/typings/ICourses';
import type { RootState } from '../store/typings/types';
import { setCredentials } from '../store/reducers/tokenReducer';
import { store } from '../store/store';
import { IFullCourse } from '../store/typings/IFullCourse';

export const coursesAPI = createApi({
    reducerPath: "coursesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.wisey.app/api/v1/",
        prepareHeaders:  async (headers, {getState}) => {
            let token = (getState() as RootState).tokenReducer.token;
            if(!token) {
                    token = (await axios({ url:"https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions" })).data.token;
                    store.dispatch(setCredentials(token));
            }
            headers.set('authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    tagTypes: ['courses'],
    endpoints: (builder) => ({
        fetchAllCourses: builder.query<ICourse[], number>({
            query: (limit: number = 5) => ({
                url: "core/preview-courses",
                params: { limit },
            }),
            transformResponse: (responce:ICourses) => responce.courses,
        }),
        fetchCourse: builder.query<IFullCourse, string>({
            query: (courseId: string) => ({
                url: "core/preview-courses/"+courseId
            })
        }),
      }),
});

