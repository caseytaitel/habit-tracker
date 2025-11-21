const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const base = `${API_BASE_URL}/api/habits`;

export const getHabits = () => {
  return fetch(base).then(res => res.json());
};

export const createHabit = (data) => {
  return fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
};

export const updateHabit = (id, data) => {
  return fetch(`${base}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
};

export const deleteHabit = (id) => {
  return fetch(`${base}/${id}`, {
    method: "DELETE",
  }).then(res => res.json());
};
