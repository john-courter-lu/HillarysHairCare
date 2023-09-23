const _apiUrl = "/api/appointments";

export const getAppointments = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getAppointment = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((r) => r.json());
};
