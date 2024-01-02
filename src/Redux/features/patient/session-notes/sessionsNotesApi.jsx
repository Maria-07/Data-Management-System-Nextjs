import { api } from "@/Redux/api/apiSlice";

export const sessionsNotesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get Session Notes
    sessionNotesData: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/session-note",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["sessionNotesData"],
    }),

  }),
});

export const {
  useSessionNotesDataMutation,
} = sessionsNotesApi;
