import { api } from "@/Redux/api/apiSlice";

export const clearenceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Get clearence api
    getClearence: builder.query({
      query: ({ token, page, id }) => ({
        //url: `inadmin/provider/clearance/list`,
        method: "GET",
        url: `clearance`,
        //method: "GET",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        //body: JSON.stringify({ page, id }),
      }),
      providesTags: ["Clearence"],
    }),
    //get staff clearence table individual data
    clearenceInfo: builder.query({
      query: ({ token, id }) => ({
        url: `inadmin/provider/single/clearance/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["Clearence"],
    }),
    //Add staff clearence
    addClearence: builder.mutation({
      query: ({ token, payload }) => ({
        url: "clearance/create",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Clearence"],
    }),

    //Update staff clearence info
    updateClearence: builder.mutation({
      query: ({ token, payload }) => ({
        url: "clearance/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Clearence"],
    }),
    //delete staff clearence
    deleteClearance: builder.mutation({
      query: ({ token, payload }) => ({
        url: "clearance/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Clearence"],
    }),
  }),
});

export const {
  useAddClearenceMutation,
  useUpdateClearenceMutation,
  useGetClearenceQuery,
  useClearenceInfoQuery,
  useDeleteClearanceMutation,
} = clearenceApi;
