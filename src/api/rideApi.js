const BASE_URL = "http://localhost:5000/rides";

export const createRide = async (rideData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rideData),
  });
  return res.json();
};


export const getRidesByUser = async (user_id) => {
  const res = await fetch(`${BASE_URL}/user/${user_id}`);
  return res.json();
};


export const getRideById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};
