import { baseApi } from "../../api/baseApi";

const academicDepartmentManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicManagement: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-department",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicDepartments: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddAcademicManagementMutation, useGetAllAcademicDepartmentsQuery } =
  academicDepartmentManagement;
