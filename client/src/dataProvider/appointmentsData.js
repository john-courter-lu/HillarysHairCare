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

export const cancelAppointment = async (id) => {
  try {
    const response = await fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (response.status !== 204 ) {
      throw new Error(`Error removing appointment (Status ${response.status})`);
    }

    return true; // Return true if the removal was successful
  
  } catch (error) {

    console.error("Error removing appointment:", error);
    throw error;

  }
};
// 这个的error catching是最全面的了, 既有!response.ok 又有error. 
// 同时有  return true; 不知是否有实质影响; 反正不用也行
// 关于response.status的error handling必须要用 = async(id) 和 response = await fetch, 否则response.status永远是undefined, 也就是永远有error.
// We use "await" with fetch to wait for the response.