import { api } from "@/Redux/api/apiSlice";

export const payrollApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //staff payroll get
    getPayrolls: builder.query({
      query: ({ token, page, id }) => ({
        url: `inadmin/provider/payroll/list/get`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ page, id }),
      }),
      providesTags: ["Payroll"],
    }),
    //Add staff payroll
    addPayroll: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/payroll/save",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Payroll"],
    }),
    //get staff payroll table individual data
    getpayrollinfo: builder.query({
      query: ({ token, id, payload }) => ({
        url: `admin/ac/staff/payroll/single/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["Payroll"],
    }),
    //Update staff credential info
    updatePayroll: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/payroll/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Payroll"],
    }),
    //Delete payroll (individual)
    deletePayroll: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/payroll/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Payroll"],
    }),
    //Delete payroll (Bulk Delete)
    bulkDeletePayroll: builder.mutation({
      query: ({ token, payload }) => ({
        url: "admin/ac/staff/payroll/bulk/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Payroll"],
    }),

    //update bulk payload
    bulkUpdatePayroll: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/payroll/bulk/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Payroll"],
    }),
  }),
});

export const {
  useGetPayrollsQuery,
  useAddPayrollMutation,
  useGetpayrollinfoQuery,
  useUpdatePayrollMutation,
  useDeletePayrollMutation,
  useBulkDeletePayrollMutation,
  useBulkUpdatePayrollMutation,
} = payrollApi;
