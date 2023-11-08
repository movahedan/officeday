export const routes = {
  backend: {
    groupEvent: {
      post: () => "/api/group-event",
      get: (id: string) => `/api/group-event/${id}`,
      join: {
        post: (id: string) => `/api/group-event/${id}/join`,
        put: (id: string, name: string) =>
          `/api/group-event/${id}/join/${name}`,
      },
    },
  },
  frontend: {
    index: () => "/",
    groupEvent: {
      create: () => "/group-event",
      groupEvent: (id: string) => `/group-event/${id}`,
      join: (id: string) => `/group-event/${id}/join`,
      selectDate: (id: string, name: string) =>
        `/group-event/${id}/join/${name}`,
    },
  },
};
