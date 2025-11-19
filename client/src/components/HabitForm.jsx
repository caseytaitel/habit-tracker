import { useEffect, useState } from "react";

function HabitForm({
  mode,
  initialHabit,
  isSubmitting,
  onSubmit,
  onCancelEdit,
}) {
  const isEdit = mode === "edit";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("DAILY");

  // Prefill in edit mode
  useEffect(() => {
    if (isEdit && initialHabit) {
      setName(initialHabit.name || "");
      setDescription(initialHabit.description || "");
      setFrequency(initialHabit.frequency || "DAILY");
    } else {
      // reset on create mode
      setName("");
      setDescription("");
      setFrequency("DAILY");
    }
  }, [isEdit, initialHabit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // minimal client-side validation
    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      frequency,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h2>{isEdit ? "Edit Habit" : "Create Habit"}</h2>

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Name{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            style={{ width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Description{" "}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            rows={3}
            style={{ width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label>
          Frequency{" "}
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
          </select>
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isEdit ? "Update Habit" : "Create Habit"}
      </button>

      {isEdit && (
        <button
          type="button"
          onClick={onCancelEdit}
          disabled={isSubmitting}
          style={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default HabitForm;
