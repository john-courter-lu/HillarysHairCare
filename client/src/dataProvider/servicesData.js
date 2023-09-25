const _apiUrl = "/api/services";

export const getServices = () => {
  return fetch(_apiUrl).then((r) => r.json());
};