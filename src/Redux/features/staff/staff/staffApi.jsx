//stuff crud operatios api will be handled here

import { api } from "@/Redux/api/apiSlice";

export const staffApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get staff info id wise
    getInfo: builder.query({
      query: ({ token, id }) => ({
        //url: `inadmin/provider/biographic/${id}`,
        url: `personal-info`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          Authorization: token || null,
        },
      }),
      providesTags: (result, error, arg) => {
        // console.log(result);
        return [
          { type: "Staff", id: arg.id }, //dynamic tag //each single video ar jnno different different single tag provided
        ];
      },
    }),
    //Create Stuff
    createStuff: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/create",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["StuffTable"],
    }),
    // Update Staff Info
    updateStaff: builder.mutation({
      query: ({ token, payload }) => ({
        //url: "inadmin/provider/biographic/update",
        url: "/personal-info/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          Authorization: token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: (result, error, arg) => [
        "StuffTable",
        { type: "Staff", id: arg.payload.employee_edit_id }, //dynamic tag //each single video ar jnno different different single tag invalidates
      ],
    }),
  }),
});

export const {
  useCreateStuffMutation,
  useGetInfoQuery,
  useUpdateStaffMutation,
} = staffApi;
