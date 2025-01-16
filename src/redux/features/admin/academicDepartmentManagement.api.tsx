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
  }),
});

export const { useAddAcademicManagementMutation } =
  academicDepartmentManagement;
