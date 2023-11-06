export const routes = {
  backend: {
    groupEvent: {
      create: () => "/api/group-event",
      get: (id: string) => `/api/group-event/${id}`,
    },
  },
  frontend: {
    index: () => "/",
    event: {
      create: () => "/event/create",
      groupEvent: (id: string) => `/event/${id}`,
    },
  },
};
