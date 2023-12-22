//create appointment api will be handled here

import { api } from "@/Redux/api/apiSlice";

export const apointmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Appointment Get Patient Name
    getAppointmentPatientName: builder.query({
      query: (token) => ({
        url: `admin/ac/appointment/get/clients`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
      }),
    }),
    //Appointment Get Provider Name
    getAppointmentProviderName: builder.query({
      query: (token) => ({
        url: `admin/ac/appointment/get/provider`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
      }),
    }),
    //Appointment Get Patient Authorization
    getAppointmentPatientAuth: builder.mutation({
      query: ({ token, payload }) => ({
        url: `admin/ac/appointment/get/client/auth`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }),
    }),
    //Appointment Get Patient Authorization Activity/Service
    getAppointmentAuthorizationActivity: builder.mutation({
      query: ({ token, payload }) => ({
        url: `admin/ac/appointment/get/client/auth/act`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }),
    }),

    //Appointment Get POS
    getAppointmentPOS: builder.query({
      query: (token) => ({
        //url: `/inadmin/setting/list/all/pos/code`,
        //method: "POST",
        url: `/appointment/pointofservice`,
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
    }),

    //Appointment Create New Session
    appointmentCreate: builder.mutation({
      query: ({ token, payload }) => ({
        url: `admin/ac/appointment/save`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }),
    }),

    //Appointment Info
    appointmentInfo: builder.query({
      query: ({ token, payload }) => ({
        //url: `admin/ac/get/single/appointment/info`,
        url: `/appointments/list`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }),
    }),
  }),
});

export const {
  useGetAppointmentPatientNameQuery,
  useGetAppointmentProviderNameQuery,
  useGetAppointmentPatientAuthMutation,
  useGetAppointmentAuthorizationActivityMutation,
  useGetAppointmentPOSQuery,
  useAppointmentCreateMutation,
  useAppointmentInfoQuery,
} = apointmentApi;
