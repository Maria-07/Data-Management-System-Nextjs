import { api } from "@/Redux/api/apiSlice";

export const patientDocumentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    //get document  list
    getDocument: builder.query({
      query: ({ token, payload }) => ({
        url: `/patient/document`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["documentData"],
    }),

    // delete document
    deleteDocument: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/document/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["documentData"],
    }),
    
    // Update call log
    updateCalllog: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/call-log/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

    // create call log
    createPatientDoc: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/document/create",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["documentData"],
    }),

    // get document type
    getDocumentType: builder.query({
      query: ({ token, id }) => ({
        url: `patient/document/type`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["calllogData"],
    }),

    // get file for view
    viewDocumentFile: builder.mutation({
      query: ({ token, payload }) => ({
        url: `patient/document/file`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["documentImageData"],
    }),


  }),
});

export const {
  useGetDocumentQuery,
  useDeleteDocumentMutation,
  useUpdateCalllogMutation,
  useCreatePatientDocMutation,
  useGetDocumentTypeQuery,
  useViewDocumentFileMutation,
} = patientDocumentApi;
