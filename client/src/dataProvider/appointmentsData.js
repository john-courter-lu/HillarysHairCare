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

export const cancelAppointment = (id) => {
  try {
    const response = fetch(`${_apiUrl}/cancel/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
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
// 还可以改进: 用 = async(id) 和 response = await fetch