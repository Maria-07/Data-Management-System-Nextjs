import { api } from "@/Redux/api/apiSlice";

export const credentialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Get staff credentials
    /*getCredentials: builder.query({
      query: ({ token, page, id }) => ({
        url: `inadmin/provider/credential/list`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ page, id }),
      }),
      providesTags: ["Credentials"],
    }),*/

    getCredentials: builder.query({
      query: ({  token, id }) => ({
        url: `credentials`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
      }),
      providesTags: ["Credentials"],
    }),

    //Add staff credential
    addCredential: builder.mutation({
      query: ({ token, payload }) => ({
        url: "credential/create",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Credentials"],
    }),
    //get staff credential table individual data
    getcredentialinfo: builder.query({
      query: ({ token, id }) => ({
        url: `inadmin/provider/single/credential/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["Credentials"],
    }),
    //Update staff credential info
    updateCredential: builder.mutation({
      query: ({ token, payload }) => ({
        url: "credential/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Credentials"],
    }),
    //Delete staff credential info
    deleteCredential: builder.mutation({
      query: ({ token, payload }) => ({
        url: "credential/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Credentials"],
    }),
  }),
});

export const {
  useGetCredentialsQuery,
  useAddCredentialMutation,
  useUpdateCredentialMutation,
  useGetcredentialinfoQuery,
  useDeleteCredentialMutation,
} = credentialApi;
