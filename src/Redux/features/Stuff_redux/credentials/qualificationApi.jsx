import { apiSlice } from "../../api/apiSlice";

export const qualificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get qualification
    getQualification: builder.query({
      query: ({ token, page, id }) => ({
        url: `inadmin/provider/qualification/list`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ page, id }),
      }),
      providesTags: ["Qualification"],
    }),
    //Add qualification
    addQualification: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/qualification/save",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Qualification"],
    }),
    //get qualification table individual data
    getQualificationInfo: builder.query({
      query: ({ token, id }) => ({
        url: `inadmin/provider/single/qualification/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["Qualification"],
    }),
    //Update qualification info
    updateQualification: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/qualification/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Qualification"],
    }),
    //Delete qualification by id
    deleteQualification: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/qualification/delete`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Qualification"],
    }),
  }),
});

export const {
  useAddQualificationMutation,
  useGetQualificationQuery,
  useUpdateQualificationMutation,
  useDeleteQualificationMutation,
  useGetQualificationInfoQuery,
} = qualificationApi;
