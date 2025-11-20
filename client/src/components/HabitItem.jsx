function HabitItem({ habit, onEdit, onDelete, onToggleActive, onToggleCompletedToday }) {
  const handleActiveChange = (e) => {
    const newValue = e.target.checked;
    onToggleActive(habit.id, newValue);
  };

  const handleCompletedChange = (e) => {
    const newValue = e.target.checked;
    onToggleCompletedToday(habit.id, newValue);
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{habit.name}</div>
        {habit.description && (
          <div style={{ fontSize: "0.9rem", color: "#555" }}>
            {habit.description}
          </div>
        )}
        <div style={{ fontSize: "0.85rem", color: "#777" }}>
          Frequency: {habit.frequency}
        </div>
        <div style={{ marginTop: "0.25rem", fontSize: "0.85rem" }}>
          <label style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              checked={habit.isActive !== false}
              onChange={handleActiveChange}
            />{" "}
            Active
          </label>
          <label>
            <input
              type="checkbox"
              checked={habit.completedToday === true}
              onChange={handleCompletedChange}
            />{" "}
            Completed today
          </label>
        </div>
      </div>

      <div>
        <button onClick={() => onEdit(habit)} style={{ marginRight: "0.5rem" }}>
          Edit
        </button>
        <button onClick={() => onDelete(habit.id)}>Delete</button>
      </div>
    </li>
  );
}

export default HabitItem;
