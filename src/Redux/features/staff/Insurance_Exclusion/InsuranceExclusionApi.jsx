import { api } from "@/Redux/api/apiSlice";

const InsuranceExclusionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //  get all payor by id
    getAllPayor: builder.query({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/ac/staffs/get/all/payor`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["Insurance"],
    }),
    //  get all assign payor by id
    getAssigned: builder.query({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/ac/staffs/get/assign/payor`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["Insurance"],
    }),

    // exclusion  Selected
    excludeSelected: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/ac/staffs/payor/exclusion/add`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Insurance"],
    }),

    // exclusion  Delete
    excludeDelete: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/ac/staffs/payor/exclusion/delete`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Insurance"],
    }),
  }),
});

export const {
  useGetAllPayorQuery,
  useGetAssignedQuery,
  useExcludeSelectedMutation,
  useExcludeDeleteMutation,
} = InsuranceExclusionApi;
