const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });

    // Handle non-2xx
    if (!res.ok) {
      const errText = await res.text();
      throw {
        status: res.status,
        message: errText || "Request failed",
      };
    }

    // Parse JSON safely
    const data = await res.json().catch(() => ({}));
    return data;
  } catch (err) {
    // Always return a clean error object
    throw {
      status: err.status || 500,
      message: err.message || "Network error",
    };
  }
}

// ---- API exports ----
export const getHabits = () => request(`/api/habits`);
export const createHabit = (data) =>
  request(`/api/habits`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateHabit = (id, data) =>
  request(`/api/habits/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteHabit = (id) =>
  request(`/api/habits/${id}`, {
    method: "DELETE",
  });
