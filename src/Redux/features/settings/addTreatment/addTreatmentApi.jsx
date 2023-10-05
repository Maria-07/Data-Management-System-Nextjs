import { api } from "@/Redux/api/apiSlice";

export const addTreatmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // search treatment
    TreatmentSearch: builder.query({
      query: ({ token, data }) => ({
        url: `inadmin/setting/get/all/treatment/search`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(data),
      }),
      providesTags: ["SearchTretment"],
    }),

    // search treatment search
    SearchSelectedTreatment: builder.query({
      query: ({ token, data }) => ({
        url: `inadmin/setting/get/all/Selectedtreatment/search`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(data),
      }),
      providesTags: ["SearchSelectedTretment"],
    }),

    //All Treatment Api
    getAllTreatments: builder.query({
      query: ({ token }) => ({
        url: `inadmin/setting/get/all/treatment`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["AllTreatments"],
    }),

    //Facility Selected Treatment Api
    getAllSelectedTreatments: builder.query({
      query: ({ token }) => ({
        url: `inadmin/setting/get/all/facility/treatment`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["selectedTreatments"],
    }),

    // add
    addTreatment: builder.mutation({
      query: ({ token, data }) => ({
        url: `inadmin/setting/add/treatment/facility`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [
        "AllTreatments",
        "SearchSelectedTretment",
        "selectedTreatments",
        "SearchTretment",
        "PatientAuthorization",
      ],
    }),

    //  delete
    deleteTreatment: builder.mutation({
      query: ({ token, data }) => ({
        url: `inadmin/setting/remove/treatment/facility/`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [
        "AllTreatments",
        "selectedTreatments",
        "SearchTretment",
        "SearchSelectedTretment",
      ],
    }),
  }),
});

export const {
  useGetAllTreatmentsQuery,
  useGetAllSelectedTreatmentsQuery,
  useAddTreatmentMutation,
  useDeleteTreatmentMutation,
  useTreatmentSearchQuery,
  useSearchSelectedTreatmentQuery,
} = addTreatmentApi;
