import { useEffect, useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

const API_BASE_URL = "http://localhost:3000";

function App() {
  // ---- State shape ----
  const [habits, setHabits] = useState([]); // Habit[]
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formMode, setFormMode] = useState("create"); // "create" | "edit"
  const [selectedHabit, setSelectedHabit] = useState(null); // Habit | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- Load habits on mount ----
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/habits`);
        if (!res.ok) {
          throw new Error("Failed to fetch habits");
        }

        const data = await res.json();
        setHabits(data.habits || []);
      } catch (err) {
        console.error("Error fetching habits:", err);
        setError("Failed to load habits.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // ---- Handlers ----

  const handleCreateHabit = async (values) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/habits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to create habit");
      }

      const data = await res.json();
      const newHabit = data.habit;
      setHabits((prev) => [...prev, newHabit]);
      setFormMode("create");
      setSelectedHabit(null);
    } catch (err) {
      console.error("Error creating habit:", err);
      setError(err.message || "Failed to create habit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateHabit = async (values) => {
    if (!selectedHabit) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch(
        `${API_BASE_URL}/api/habits/${selectedHabit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to update habit");
      }

      const data = await res.json();
      const updated = data.habit;

      setHabits((prev) =>
        prev.map((h) => (h.id === updated.id ? updated : h))
      );

      setFormMode("create");
      setSelectedHabit(null);
    } catch (err) {
      console.error("Error updating habit:", err);
      setError(err.message || "Failed to update habit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/habits/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to delete habit");
      }

      // Option 1: hide deleted habits from list (since isActive=false)
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Error deleting habit:", err);
      setError(err.message || "Failed to delete habit.");
    }
  };

  const handleEditHabit = (habit) => {
    setFormMode("edit");
    setSelectedHabit(habit);
  };

  const handleCancelEdit = () => {
    setFormMode("create");
    setSelectedHabit(null);
  };

  const handleSubmitHabit = (values) => {
    if (formMode === "create") {
      return handleCreateHabit(values);
    } else {
      return handleUpdateHabit(values);
    }
  };

  const handleToggleActive = async (id, newIsActive) => {
    try {
      setError(null);
  
      const res = await fetch(`${API_BASE_URL}/api/habits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newIsActive }),
      });
  
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to update active state");
      }
  
      const data = await res.json();
      const updated = data.habit;
  
      setHabits((prev) =>
        prev.map((h) => (h.id === updated.id ? updated : h))
      );
    } catch (err) {
      console.error("Error toggling active state:", err);
      setError(err.message || "Failed to update active state.");
    }
  };
  
  const handleToggleCompletedToday = async (id, newCompleted) => {
    try {
      setError(null);
  
      const res = await fetch(`${API_BASE_URL}/api/habits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedToday: newCompleted }),
      });
  
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to update completion");
      }
  
      const data = await res.json();
      const updated = data.habit;
  
      setHabits((prev) =>
        prev.map((h) => (h.id === updated.id ? updated : h))
      );
    } catch (err) {
      console.error("Error toggling completedToday:", err);
      setError(err.message || "Failed to update completion.");
    }
  };  

  // ---- Render ----

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem" }}>
      <h1>Habit Tracker</h1>

      {error && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            border: "1px solid #f00",
          }}
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Loading habits...</p>
      ) : (
        <>
          <HabitForm
            mode={formMode}
            initialHabit={selectedHabit}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitHabit}
            onCancelEdit={handleCancelEdit}
          />

          <hr style={{ margin: "1.5rem 0" }} />

          <HabitList
            habits={habits}
            onEdit={handleEditHabit}
            onDelete={handleDeleteHabit}
            onToggleActive={handleToggleActive}
            onToggleCompletedToday={handleToggleCompletedToday}
          />
        </>
      )}
    </div>
  );
}

export default App;
