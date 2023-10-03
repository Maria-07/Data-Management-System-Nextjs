import { apiSlice } from "../../api/apiSlice";

export const staffInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get staff table and emergency table data
    staffContactInfo: builder.query({
      //staffContactInfo
      query: ({ token, id }) => ({
        url: `inadmin/provider/contact/info/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["ContactInfo"],
    }),

    //   addContactInfo  staff contact info
    addContactInfo: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/contact/info/update`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["ContactInfo"],
    }),

    //   add Emergency contact info
    addEmergencyContactInfo: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/emergency/contact/info/update`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["ContactInfo"],
    }),
  }),
});

export const { useStaffContactInfoQuery, useAddContactInfoMutation, useAddEmergencyContactInfoMutation } = staffInfoApi;
