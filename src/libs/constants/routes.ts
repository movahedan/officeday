export const routes = {
  backend: {
    groupEvent: {
      post: () => "/api/group-event",
      get: (id: string) => `/api/group-event/${id}`,
      join: {
        post: (id: string) => `/api/group-event/${id}/join`,
        put: (id: string, personId: string) =>
          `/api/group-event/${id}/join/${personId}`,
      },
    },
  },
  frontend: {
    index: () => "/",
    groupEvent: {
      create: () => "/group-event",
      groupEvent: (id: string) => `/group-event/${id}`,
      join: (id: string) => `/group-event/${id}/join`,
      selectDate: (id: string, personId: string) =>
        `/group-event/${id}/join/${personId}`,
    },
  },
};
