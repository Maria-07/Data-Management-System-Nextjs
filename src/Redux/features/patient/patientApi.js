import { api } from "@/Redux/api/apiSlice";

const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getPatient: builder.mutation({
    //   query: (page) => ({
    //     url: "/patient/list",
    //     method: "POST",
    //     body: { page },
    //   }),
    //   invalidatesTags: [],
    // }),
    // getPatientInfo: builder.mutation({
    //   query: ({ payload }) => ({
    //     url: "/patient/list",
    //     method: "POST",
    //     body: { payload },
    //   }),
    //   invalidatesTags: [],
    // }),
    getInsuranceData: builder.query({
      query: ({ token }) => ({
        url: `/patient/create/insurance/list`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["insuranceData"],
    }),

    createPatient: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/create",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["patientData"],
    }),

  }),
});

export const {  useGetInsuranceDataQuery, useCreatePatientMutation } = patientApi;
