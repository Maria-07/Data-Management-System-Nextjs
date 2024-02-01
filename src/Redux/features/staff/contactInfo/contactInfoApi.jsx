import { api } from "@/Redux/api/apiSlice";

export const staffInfoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get staff table and emergency table data
    staffContactInfo: builder.query({
      //staffContactInfo
      query: ({ token, id }) => ({
        //url: `inadmin/provider/contact/info/${id}`,
        url: `contact-info`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
      }),
      providesTags: ["ContactInfo"],
    }),

    //   addContactInfo  staff contact info
    addContactInfo: builder.mutation({
      query: ({ token, payload }) => ({
        //url: `inadmin/provider/contact/info/update`,
        url: `/contact-info/update`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["ContactInfo"],
    }),

    //   add Emergency contact info
    addEmergencyContactInfo: builder.mutation({
      query: ({ token, payload }) => ({
        //url: `inadmin/provider/emergency/contact/info/update`,
        url: `/contact-info/update`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["ContactInfo"],
    }),

    stateInfo: builder.query({
      //staffContactInfo
      query: ({ token, id }) => ({
        url: `state`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
      }),
      providesTags: ["StateInfo"],
    }),
  }),
});

export const {
  useStaffContactInfoQuery,
  useAddContactInfoMutation,
  useAddEmergencyContactInfoMutation,
  useStateInfoQuery,
} = staffInfoApi;
