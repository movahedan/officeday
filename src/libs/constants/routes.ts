export const routes = {
  backend: {
    room: {
      create: () => "/api/room",
      get: (id: string) => `/api/room/${id}`,
    },
  },
  frontend: {
    index: () => "/",
    event: {
      create: () => "/event/create",
      room: (id: string) => `/event/${id}`,
    },
  },
};
