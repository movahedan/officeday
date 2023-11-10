export const routes = {
  index: () => "/",
  groupEvent: {
    create: () => "/group-event",
    groupEvent: (id: string) => `/group-event/${id}`,
    join: (id: string) => `/group-event/${id}/join`,
    selectDate: (id: string, personId: string) =>
      `/group-event/${id}/join/${personId}`,
  },
};
