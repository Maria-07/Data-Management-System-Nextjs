import { api } from "@/Redux/api/apiSlice";

export const patientAuthorizationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    //get patient authorization api
    getPatientAuthorization: builder.query({
      query: ({ token, id }) => ({
        url: `patient/authorization/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload), 
      }),
      providesTags: ["PatientAuthorizationTable"],
    }),

    //Patient Authorization Create Info
    getAuthorizationCreateInfo: builder.query({
      query: ({ token, id }) => ({
        url: `inadmin/patient/authorization/create/info/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
    }),

    //get patient single authorization info
    getPatientAuthorizationInfo: builder.query({
      query: ({ token, id }) => ({
        //url: `inadmin/patient/authorization/single/${id}`,
        url: `patient/authorization/details/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["PatientAuthorization"],
    }),

    //Patient Authorization create=>patient id wise
    //Patient Authorization Save
    patientAuthorizationCreate: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/create`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientAuthorizationTable"],
    }),

    //update Authorization Info
    patientAuthorizationUpdate: builder.mutation({
      query: ({ token, payload }) => ({
        //url: `inadmin/patient/authorization/update`,
        url: `patient/authorization/update`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientAuthorization", "PatientAuthorizationTable"],
    }),

    //delete Authorization
    patientAuthorizationDelete: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/delete`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientAuthorizationTable"],
    }),

    //---------Patient Authorization Activity---------------
    //Get Patient Authorization Activity api
    getPatientAuthorizationActivity: builder.query({
      query: ({ token, id }) => ({
        //url: `inadmin/patient/authorization/activity/list`,
        url: `patient/authorization/service/list/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["PatientAuthorizationActivity"],
    }),

    //Get Patient Authorization setting Services api
    getSettingService: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/get/service/bytxtype`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
    }),
    //Get Patient Authorization Activity SubType api
    getActivitySubtypes: builder.query({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/get/subtype/bytxtype`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
    }),

    //Get Patient Authorization Activity Cptcode api
    getActivityCptcode: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/get/cpt/bytxtype`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
    }),

    //Patient Authorization Activity SubActivity(needed when to update activity)
    //result will be shown in the Service Sub-Type field
    getServiceSubType: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/get/service/subtype`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
    }),

    // ----------------Patient Authorization Activity------------------
    //Patient Authorization activity create/add
    patientAuthorizationActivityCreate: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/activity/create`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientAuthorizationActivity"],
    }),
    //Patient Authorization Activity Info(Activity Id wise)
    patientAuthorizationActivityInfo: builder.query({
      query: ({ token, id }) => ({
        url: `inadmin/patient/authorization/activity/get/single/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["IndividualActivity"],
    }),

    //Patient Authorization Activity Update
    patientAuthorizationActivityUpdate: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/activity/update`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientAuthorizationActivity", "IndividualActivity"],
    }),

    //Patient Authorization Activity delete
    patientAuthorizationActivityDelete: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/patient/authorization/activity/delete`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientAuthorizationActivity"],
    }),
  }),
});

export const {
  useGetPatientAuthorizationQuery,
  useGetPatientAuthorizationInfoQuery,
  useGetAuthorizationCreateInfoQuery,
  usePatientAuthorizationCreateMutation,
  usePatientAuthorizationUpdateMutation,
  usePatientAuthorizationDeleteMutation,
  useGetPatientAuthorizationActivityQuery,
  usePatientAuthorizationActivityInfoQuery, 
  usePatientAuthorizationActivityCreateMutation,
  usePatientAuthorizationActivityUpdateMutation,
  usePatientAuthorizationActivityDeleteMutation,
  useGetSettingServiceMutation,
  useGetActivitySubtypesQuery,
  useGetActivityCptcodeMutation,
  useGetServiceSubTypeMutation,
} = patientAuthorizationApi;
