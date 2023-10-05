import { api } from "@/Redux/api/apiSlice";

export const addStaffTypeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //All getAllStaff Api
    getAllStaff: builder.query({
      query: ({ token }) => ({
        url: `inadmin/setting/all/staff/types`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["ALLSTAFF"],
    }),

    //Facility getSelectedStaff Api
    getSelectedStaff: builder.query({
      query: ({ token }) => ({
        url: `inadmin/setting/selected/staff/types`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["SELECTEDSTAFF"],
    }),

    // add
    addStaffType: builder.mutation({
      query: ({ token, data }) => ({
        url: `inadmin/setting/add/staff/type/to/selected`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [
        "ALLSTAFF",
        "SELECTEDSTAFF",
        // "SearchSelectedTretment",
        // "selectedTreatments",
        // "SearchTretment",
      ],
    }),

    //  delete
    // removeCptExclusion: builder.mutation({
    //   query: ({ token, data }) => ({
    //     url: `setting/remove/cpt/exclusion`,
    //     method: "POST",
    //     headers: {
    //       "content-type": "Application/json",
    //       "x-auth-token": token,
    //     },
    //     body: JSON.stringify(data),
    //   }),
    //   invalidatesTags: [
    //     "availableCptCodes",
    //     "excludedCptCodes",
    //     // "SearchTretment",
    //     // "SearchSelectedTretment",
    //   ],
    // }),
  }),
});

export const {
  useAddStaffTypeMutation,
  useGetAllStaffQuery,
  useGetSelectedStaffQuery,
} = addStaffTypeApi;
