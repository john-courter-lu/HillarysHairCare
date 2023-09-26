const _apiUrl = "/api/stylists";

export const getStylists = () => {
  return fetch(_apiUrl).then((r) => r.json());
};
