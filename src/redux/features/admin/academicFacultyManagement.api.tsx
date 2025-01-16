import { baseApi } from "../../api/baseApi";

const academicFacultyManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddAcademicFacultyMutation, useGetAllFacultyQuery } =
  academicFacultyManagement;
