import { TQueryParams, TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagementType";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getAllSemesters: builder.query({
      query: (args) => {
        // filtering query :
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name as string, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      // transformResponse use for getting data from server and store in redux.
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useAddAcademicSemestersMutation, useGetAllSemestersQuery } =
  academicManagementApi;
