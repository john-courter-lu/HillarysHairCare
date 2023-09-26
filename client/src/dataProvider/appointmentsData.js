const _apiUrl = "/api/appointments";

export const getAppointments = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getAppointment = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((r) => r.json());
};

export const createAppointment = (appointment) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  }).then((res) => res.json());
};

